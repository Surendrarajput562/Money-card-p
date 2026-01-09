const express = require('express');
const axios = require('axios');
const admin = require('firebase-admin');
const cors = require('cors');
const { HttpsProxyAgent } = require('https-proxy-agent');

const app = express();
app.use(cors());
app.use(express.json());

// --- 1. FIREBASE INITIALIZATION ---
if (!admin.apps.length) {
    try {
        let pKey = process.env.FIREBASE_PRIVATE_KEY || "";
        const cleanKey = pKey.trim().replace(/^"|"$/g, '').replace(/\\n/g, '\n');
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: cleanKey
            }),
            databaseURL: "https://smbrand-4543a-default-rtdb.firebaseio.com"
        });
    } catch (e) { console.error("Firebase Error:", e.message); }
}
const db = admin.database();
const agent = process.env.FIXIE_URL ? new HttpsProxyAgent(process.env.FIXIE_URL) : null;

const getHeaders = () => ({
    'x-client-id': process.env.PAN_CLIENT_ID,
    'x-client-secret': process.env.PAN_CLIENT_SECRET,
    'Content-Type': 'application/json'
});

// --- MIDDLEWARE: DEVELOPER WALLET DEDUCTION ---
const validateDevAndDeduct = async (req, res, next) => {
    const userKey = req.headers['x-api-key'];     
    const userId = req.headers['x-user-id']; 
    if (!userKey || !userId) return res.status(401).json({ success: false, message: "Missing Credentials" });

    try {
        const snapshot = await db.ref(`users/${userId}/api_settings`).once('value');
        const settings = snapshot.val();
        if (!settings || settings.key !== userKey) return res.status(403).json({ success: false, message: "Invalid API Key" });

        const currentBalance = Number(settings.balance || 0);
        if (currentBalance < 1) return res.status(402).json({ success: false, message: "Insufficient Balance" });

        req.devUid = userId; 
        req.currentBalance = currentBalance;
        next();
    } catch (e) { res.status(500).json({ success: false, message: "Auth DB Error" }); }
};

// ==========================================================
// --- SECTION 1: DEVELOPER APIs (PAID /v1/) ---
// ==========================================================
app.post('/api/v1/verify-pan', validateDevAndDeduct, async (req, res) => {
    try {
        const response = await axios.post(`https://api.cashfree.com/verification/pan`, { pan: req.body.pan.toUpperCase() }, { httpsAgent: agent, headers: getHeaders(), timeout: 8000 });
        await db.ref(`users/${req.devUid}/api_settings/balance`).set(req.currentBalance - 1);
        res.json({ success: true, registered_name: response.data.registered_name, remaining: req.currentBalance - 1 });
    } catch (e) { res.status(500).json({ success: false, message: "Dev PAN Failed" }); }
});

app.post('/api/v1/bank-sync', validateDevAndDeduct, async (req, res) => {
    try {
        const { bank_account, ifsc } = req.body;
        const response = await axios.post("https://api.cashfree.com/verification/bank-account/sync", { bank_account, ifsc, name: "Dev Test", phone: "9999999999" }, { httpsAgent: agent, headers: getHeaders(), timeout: 8000 });
        await db.ref(`users/${req.devUid}/api_settings/balance`).set(req.currentBalance - 2);
        res.json({ success: true, data: response.data, remaining: req.currentBalance - 2 });
    } catch (e) { res.status(500).json({ success: false, message: "Dev Bank Failed" }); }
});

app.post('/api/v1/aadhaar/generate-url', validateDevAndDeduct, async (req, res) => {
    try {
        const response = await axios.post(`https://api.cashfree.com/verification/digilocker`, { verification_id: `v_${Date.now()}`, redirect_url: "https://money-card-p.vercel.app/callback" }, { httpsAgent: agent, headers: getHeaders(), timeout: 8000 });
        await db.ref(`users/${req.devUid}/api_settings/balance`).set(req.currentBalance - 1);
        res.json({ success: true, url: response.data.url });
    } catch (e) { res.status(500).json({ success: false }); }
});

// ==========================================================
// --- SECTION 2: USER PORTAL (INTERNAL - ALL ON) ---
// ==========================================================

// 1. USER PAN ON
app.post('/api/verify-pan', async (req, res) => {
    const { pan, userId } = req.body;
    try {
        const response = await axios.post(`https://api.cashfree.com/verification/pan`, { pan: pan.toUpperCase() }, { httpsAgent: agent, headers: getHeaders() });
        if (userId && response.data.valid) {
            await db.ref(`users/${userId}`).update({ pan_name: response.data.registered_name, pan_number: pan.toUpperCase(), kyc_status: "VERIFIED" });
        }
        res.json({ success: true, registered_name: response.data.registered_name });
    } catch (e) { res.status(500).json({ success: false }); }
});

// 2. USER BANK ON
app.post('/api/verify-bank-sync', async (req, res) => {
    const { userId, bank_account, ifsc, phone, name } = req.body;
    try {
        const response = await axios.post("https://api.cashfree.com/verification/bank-account/sync", { bank_account, ifsc, name, phone }, { httpsAgent: agent, headers: getHeaders() });
        if (userId && response.data.status === "SUCCESS") {
            await db.ref(`users/${userId}/bank_details`).set({ account_number: bank_account, ifsc: ifsc, holder_name: response.data.name_at_bank });
            await db.ref(`users/${userId}/profile`).update({ step: 'BANK_ADDED' });
        }
        res.json({ success: true, name: response.data.name_at_bank });
    } catch (e) { res.status(500).json({ success: false }); }
});

// 3. USER DIGILOCKER ON
app.post('/api/create-digilocker-url', async (req, res) => {
    const { userId } = req.body;
    try {
        const response = await axios.post(`https://api.cashfree.com/verification/digilocker`, { verification_id: `uv_${Date.now()}`, redirect_url: "https://money-card-p.vercel.app/callback" }, { httpsAgent: agent, headers: getHeaders() });
        res.json({ success: true, url: response.data.url });
    } catch (e) { res.status(500).json({ success: false }); }
});

module.exports = app;
