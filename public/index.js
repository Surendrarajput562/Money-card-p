const express = require('express');
const axios = require('axios');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Firebase (Vercel Env Variables)
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
        databaseURL: "https://smbrand-4543a-default-rtdb.firebaseio.com"
    });
}
const db = admin.database();

// PRODUCTION HEADERS (MANDATORY)
const cfHeaders = {
    'x-client-id': process.env.PAN_CLIENT_ID,
    'x-client-secret': process.env.PAN_CLIENT_SECRET,
    'x-api-version': '2022-09-01', 
    'Content-Type': 'application/json'
};

// --- API: PAN Verify (Production) ---
app.post('/api/verify-pan', async (req, res) => {
    const { pan, userId, name } = req.body;
    try {
        const response = await axios.post("https://api.cashfree.com/verification/pan", 
        { pan, name }, { headers: cfHeaders });
        
        if(response.data.valid) {
            await db.ref(`users/${userId}/profile`).update({ 
                step: 'DIGILOCKER', 
                registered_name: response.data.registered_name 
            });
            res.json({ success: true });
        } else {
            res.json({ success: false, message: response.data.message });
        }
    } catch (e) {
        // Detailed error for troubleshooting in Vercel Logs
        const err = e.response ? e.response.data : e.message;
        console.error("PAN_PRODUCTION_ERROR:", err);
        res.status(500).json({ success: false, message: "IP/API Connection Issue", details: err });
    }
});

// --- API: Create DigiLocker URL ---
app.post('/api/create-digilocker-url', async (req, res) => {
    try {
        const response = await axios.post("https://api.cashfree.com/verification/digilocker/url", {
            verification_id: `v_${Date.now()}`,
            redirect_url: "https://money-card-p.vercel.app/api/callback" 
        }, { headers: cfHeaders });
        res.json({ url: response.data.url });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// --- API: Bank Verify (Sync) ---
app.post('/api/verify-bank', async (req, res) => {
    const { bank_account, ifsc, name, userId } = req.body;
    try {
        const response = await axios.post("https://api.cashfree.com/verification/bank-account/sync", 
        { bank_account, ifsc, name }, { headers: cfHeaders });
        if(response.data.account_status === 'VALID') {
            await db.ref(`users/${userId}/profile`).update({ step: 'COMPLETED' });
            res.json({ success: true });
        } else { res.json({ success: false }); }
    } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = app;
