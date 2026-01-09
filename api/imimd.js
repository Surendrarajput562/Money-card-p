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
    } catch (e) { res.status(500).json({ success: false }); }
};

// ==========================================================
// --- SECTION 1: DEVELOPER APIs (v1) - Key Required ---
// ==========================================================

// 1. IFSC LOOKUP (FREE FOR DEVS)
app.get('/api/v1/lookup/ifsc/:ifsc', validateDevAndDeduct, async (req, res) => {
    try {
        const response = await axios.get(`https://ifsc.razorpay.com/${req.params.ifsc}`);
        res.json({ success: true, data: response.data });
    } catch (e) { res.status(404).json({ success: false, message: "IFSC Not Found" }); }
});

// 2. PAN VERIFY (₹1)
app.post('/api/v1/verify-pan', validateDevAndDeduct, async (req, res) => {
    try {
        const response = await axios.post(`https://api.cashfree.com/verification/pan`, 
        { pan: req.body.pan.toUpperCase() }, { httpsAgent: agent, headers: getHeaders() });
        await db.ref(`users/${req.devUid}/api_settings/balance`).set(req.currentBalance - 1);
        res.json({ success: true, registered_name: response.data.registered_name, remaining: req.currentBalance - 1 });
    } catch (e) { res.status(500).json({ success: false }); }
});

// 3. BANK SYNC (₹2)
app.post('/api/v1/bank-sync', validateDevAndDeduct, async (req, res) => {
    try {
        const { bank_account, ifsc } = req.body;
        const response = await axios.post("https://api.cashfree.com/verification/bank-account/sync", 
        { bank_account, ifsc, name: "Dev Test", phone: "9999999999" }, { httpsAgent: agent, headers: getHeaders() });
        await db.ref(`users/${req.devUid}/api_settings/balance`).set(req.currentBalance - 2);
        res.json({ success: true, data: response.data, remaining: req.currentBalance - 2 });
    } catch (e) { res.status(500).json({ success: false }); }
});

// ==========================================================
// --- SECTION 2: USER PORTAL (INTERNAL - ALL ON) ---
// ==========================================================

// --- PAN VERIFY ---
app.post('/api/verify-pan', async (req, res) => {
    const { pan, userId } = req.body;
    try {
        const response = await axios.post(`https://api.cashfree.com/verification/pan`, 
        { pan: pan.toUpperCase() }, { httpsAgent: agent, headers: getHeaders() });
        if (response.data.valid && userId) {
            await db.ref(`users/${userId}/profile`).update({ registered_name: response.data.registered_name, pan_number: pan.toUpperCase(), step: 'DIGILOCKER' });
        }
        res.json({ success: true, registered_name: response.data.registered_name });
    } catch (e) { res.status(500).json({ success: false }); }
});

// --- DIGILOCKER URL ---
app.post('/api/create-digilocker-url', async (req, res) => {
    const { userId } = req.body;
    const v_id = `v_${userId || 'user'}_${Date.now()}`;
    try {
        const response = await axios.post(`https://api.cashfree.com/verification/digilocker`, { 
            verification_id: v_id, 
            redirect_url: `https://money-card-p.vercel.app/api/callback?userId=${userId}`, 
            document_requested: ["AADHAAR"] 
        }, { httpsAgent: agent, headers: getHeaders() });
        if(userId) await db.ref(`users/${userId}/profile`).update({ reference_id: response.data.reference_id });
        res.json({ success: true, url: response.data.url });
    } catch (e) { res.status(500).json({ success: false }); }
});

// --- CALLBACK ---
app.get('/api/callback', async (req, res) => {
    const { userId } = req.query;
    try {
        const snap = await db.ref(`users/${userId}/profile`).once('value');
        const refId = snap.val().reference_id;
        await axios.get(`https://api.cashfree.com/verification/digilocker/document/AADHAAR?reference_id=${refId}`, {
            httpsAgent: agent, headers: getHeaders()
        });
        await db.ref(`users/${userId}/profile`).update({ step: 'COMPLETED' });
        res.send("<script>window.location.href='https://smbrand-4543a.web.app/dashboard.html'</script>");
    } catch (e) { res.redirect('https://smbrand-4543a.web.app/dashboard.html'); }
});

// --- BANK SYNC ---
app.post('/api/verify-bank-sync', async (req, res) => {
    const { userId, bank_account, ifsc, phone, name } = req.body;
    const cleanPhone = phone ? phone.toString().replace(/\D/g, '').slice(-10) : "9999999999";
    try {
        const response = await axios.post("https://api.cashfree.com/verification/bank-account/sync", {
            bank_account, ifsc, name: name || "Merchant User", phone: cleanPhone
        }, { httpsAgent: agent, headers: getHeaders() });
        
        if (response.data.name_at_bank || response.data.account_status === "VALID") {
            if(userId) await db.ref(`users/${userId}/profile`).update({ step: 'BANK_ADDED' });
            res.json({ success: true, name: response.data.name_at_bank, bank_name: response.data.bank_name, ifsc, account: bank_account });
        } else { res.json({ success: false }); }
    } catch (e) { res.status(500).json({ success: false }); }
});

module.exports = app;

