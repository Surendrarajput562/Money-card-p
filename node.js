const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.get('/proxy', async (req, res) => {
    try {
        let targetUrl = req.query.url;
        if (!targetUrl) targetUrl = 'https://www.amazon.in/';

        const response = await axios.get(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
            validateStatus: (status) => status >= 200 && status < 400, // Redirects (302) ko error mat mano
            maxRedirects: 0 // Auto redirect band, hum khud handle karenge
        });

        // Backend Control: Agar Amazon redirect kar raha hai (jaise login page par)
        if (response.status >= 300 && response.status < 400 && response.headers.location) {
            let redirectUrl = response.headers.location;
            if (!redirectUrl.startsWith('http')) {
                redirectUrl = 'https://www.amazon.in' + redirectUrl;
            }
            // Redirect ko wapas hamare proxy mein bhejo
            return res.redirect(`http://localhost:${PORT}/proxy?url=${encodeURIComponent(redirectUrl)}`);
        }

        // Security headers hatana
        res.removeHeader('X-Frame-Options');
        res.removeHeader('Content-Security-Policy');
        res.set('Access-Control-Allow-Origin', '*');

        let html = response.data;
        const proxyPrefix = `http://localhost:${PORT}/proxy?url=https://www.amazon.in`;

        // Advance Rewriting: Links, Forms aur Scripts ko proxy se connect karna
        html = html.replace(/(href|src|action)="\//g, `$1="${proxyPrefix}/`);
        
        // Amazon ke login/form submission ko handle karne ke liye
        html = html.replace(/action="https:\/\/www.amazon.in/g, `action="http://localhost:${PORT}/proxy?url=https://www.amazon.in`);

        res.send(html);
    } catch (error) {
        console.error("Proxy Error:", error.message);
        res.status(500).send("Bhai, Connection fail ho gaya. Refresh karo.");
    }
});

app.listen(PORT, () => {
    console.log(`Backend Fixed: http://localhost:${PORT}`);
});

