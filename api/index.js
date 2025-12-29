const express = require('express');
const axios = require('axios');
const admin = require('firebase-admin');
const cors = require('cors');
const { HttpsProxyAgent } = require('https-proxy-agent');
const path = require('path');

const app = express();

app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// --- FIREBASE INITIALIZATION (Using JSON File) ---
if (!admin.apps.length) {
    try {
        const serviceAccount = require('./serviceAccount.json');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://smbrand-4543a-default-rtdb.firebaseio.com"
        });
        console.log("✅ Firebase Admin Initialized with JSON");
    } catch (error) {
        console.error("❌ Firebase Init Error:", error.message);
    }
}
const db = admin.database();

// 1. PAN Verify API
app.post('/api/verify-pan', async (req, res) => {
    const { pan, userId, name } = req.body;
    try {
        const response = await axios.post("https://api.cashfree.com/verification/pan", 
            { pan: pan.toUpperCase(), name: name }, 
            {
                httpsAgent: new HttpsProxyAgent(process.env.FIXIE_URL),
                headers: {
                    'x-client-id': process.env.PAN_CLIENT_ID,
                    'x-client-secret': process.env.PAN_CLIENT_SECRET,
                    'x-api-version': '2022-09-12',
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.data.valid) {
            const vName = response.data.registered_name || name;
            await db.ref(`users/${userId}/profile`).update({ 
                step: 'DIGILOCKER', 
                registered_name: vName,
                pan_number: pan.toUpperCase()
            });
            return res.status(200).json({ success: true, registered_name: vName });
        } else {
            return res.status(200).json({ success: false, message: response.data.message });
        }
    } catch (e) {
        console.error("Verification Error:", e.message);
        res.status(500).json({ success: false, message: "Gateway Error" });
    }
});

// 2. DigiLocker URL API
app.post('/api/create-digilocker-url', async (req, res) => {
    const { userId } = req.body;
    try {
        const response = await axios.post("https://api.cashfree.com/verification/digilocker/url", 
            { 
                verification_id: `v_${userId}_${Date.now()}`, 
                redirect_url: `https://money-card-p.vercel.app/api/callback?userId=${userId}` 
            }, 
            {
                httpsAgent: new HttpsProxyAgent(process.env.FIXIE_URL),
                headers: {
                    'x-client-id': process.env.PAN_CLIENT_ID,
                    'x-client-secret': process.env.PAN_CLIENT_SECRET,
                    'x-api-version': '2022-09-12'
                }
            }
        );
        res.json({ url: response.data.url });
    } catch (e) { res.status(500).json({ error: "Failed" }); }
});

// 3. Callback Handler
app.get('/api/callback', async (req, res) => {
    const { userId } = req.query;
    try {
        await db.ref(`users/${userId}/profile`).update({ step: 'COMPLETED' });
        res.send("<html><script>window.location.href='https://smbrand-4543a.web.app/dashboard.html'</script></html>");
    } catch (e) {
        res.status(500).send("Callback Sync Error");
    }
});

module.exports = app;
