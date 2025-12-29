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

// --- FIREBASE INITIALIZATION (Corrected Path) ---
if (!admin.apps.length) {
    try {
        // '../' use kiya hai kyunki serviceAccount.json api folder ke BAHAR hai
        const serviceAccountPath = path.join(__dirname, '..', 'serviceAccount.json');
        const serviceAccount = require(serviceAccountPath);
        
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://smbrand-4543a-default-rtdb.firebaseio.com"
        });
        console.log("✅ Firebase Admin Initialized from Root Folder");
    } catch (error) {
        console.error("❌ Firebase Init Error: File nahi mili ya path galat hai!", error.message);
    }
}
const db = admin.database();

// 1. PAN Verify API
app.post('/api/verify-pan', async (req, res) => {
    const { pan, userId, name } = req.body;
    if(!pan || !userId) return res.status(400).json({ success: false, message: "Missing Data" });

    try {
        const response = await axios.post("https://api.cashfree.com/verification/pan", 
            { pan: pan.toUpperCase(), name: name }, 
            {
                httpsAgent: process.env.FIXIE_URL ? new HttpsProxyAgent(process.env.FIXIE_URL) : null,
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
            // Admin SDK use ho raha hai, isliye Rules bypass ho jayenge
            await db.ref(`users/${userId}/profile`).update({ 
                step: 'DIGILOCKER', 
                registered_name: vName,
                pan_number: pan.toUpperCase()
            });
            return res.status(200).json({ success: true, registered_name: vName });
        } else {
            return res.status(200).json({ success: false, message: response.data.message || "Invalid PAN" });
        }
    } catch (e) {
        console.error("Verification Error:", e.response ? e.response.data : e.message);
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
                httpsAgent: process.env.FIXIE_URL ? new HttpsProxyAgent(process.env.FIXIE_URL) : null,
                headers: {
                    'x-client-id': process.env.PAN_CLIENT_ID,
                    'x-client-secret': process.env.PAN_CLIENT_SECRET,
                    'x-api-version': '2022-09-12'
                }
            }
        );
        res.json({ url: response.data.url });
    } catch (e) { 
        console.error("DigiLocker URL Error:", e.message);
        res.status(500).json({ error: "Failed to generate URL" }); 
    }
});

// 3. Callback Handler
app.get('/api/callback', async (req, res) => {
    const { userId } = req.query;
    if(!userId) return res.status(400).send("User ID missing");
    
    try {
        await db.ref(`users/${userId}/profile`).update({ step: 'COMPLETED' });
        // Redirecting back to your main app
        res.send("<html><body style='text-align:center;padding-top:50px;'><h2>KYC Successful!</h2><p>Redirecting...</p><script>setTimeout(()=>{window.location.href='https://smbrand-4543a.web.app/dashboard.html'}, 2000)</script></body></html>");
    } catch (e) {
        console.error("Callback Error:", e.message);
        res.status(500).send("Callback Sync Error");
    }
});

module.exports = app;
