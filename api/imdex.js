const express = require('express');
const axios = require('axios');
const admin = require('firebase-admin');
const cors = require('cors');
const { HttpsProxyAgent } = require('https-proxy-agent');

const app = express();
app.use(cors());
app.use(express.json());

// --- FIREBASE INITIALIZATION ---
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
    } catch (e) { console.error("Firebase Auth Error:", e.message); }
}
const db = admin.database();

const agent = process.env.FIXIE_URL ? new HttpsProxyAgent(process.env.FIXIE_URL) : null;

// CASHFREE HEADERS - Latest API Version
const getHeaders = () => ({
    'x-client-id': process.env.PAN_CLIENT_ID,
    'x-client-secret': process.env.PAN_CLIENT_SECRET,
    'x-api-version': '2023-12-01',
    'Content-Type': 'application/json'
});

// --- 3. BANK VERIFY (REVERSE PENNY DROP - LATEST V2 ROUTE) ---
app.post('/api/create-bank-verify-url', async (req, res) => {
    const { userId, phone } = req.body;
    const v_id = `bnk_${userId}_${Date.now()}`;
    
    try {
        // NAYA ENDPOINT: /offline/reverse-penny-drop
        const response = await axios.post("https://api.cashfree.com/verification/offline/reverse-penny-drop", { 
            verification_id: v_id, 
            phone: phone, 
            redirect_url: `https://money-card-p.vercel.app/api/bank-callback?userId=${userId}` 
        }, { 
            httpsAgent: agent, 
            headers: getHeaders() 
        });

        console.log("Cashfree Success:", response.data);
        await db.ref(`users/${userId}/bank_temp`).set({ bank_ref_id: response.data.ref_id });
        res.json({ success: true, url: response.data.url });

    } catch (e) {
        const errorData = e.response ? e.response.data : e.message;
        console.error("404 Debug - Full Error:", JSON.stringify(errorData));
        res.status(500).json({ success: false, message: errorData });
    }
});

// --- 3. BANK CALLBACK (STATUS CHECK) ---
app.get('/api/bank-callback', async (req, res) => {
    const { userId } = req.query;
    try {
        const snap = await db.ref(`users/${userId}/bank_temp`).once('value');
        if (!snap.exists()) return res.redirect('https://smbrand-4543a.web.app/dashboard.html');
        
        const { bank_ref_id } = snap.val();

        // NAYA STATUS CHECK: Path mein ref_id jaata hai
        const statusRes = await axios.get(`https://api.cashfree.com/verification/offline/reverse-penny-drop/${bank_ref_id}`, {
            httpsAgent: agent, 
            headers: getHeaders()
        });

        if (statusRes.data.status === "SUCCESS") {
            await db.ref(`users/${userId}/bank_details`).set({
                account_number: statusRes.data.bank_account,
                ifsc: statusRes.data.ifsc,
                holder_name: statusRes.data.name_at_bank,
                upi: statusRes.data.upi || "N/A",
                utr: statusRes.data.utr
            });
            await db.ref(`users/${userId}/profile`).update({ step: 'BANK_ADDED' });
        }
        res.send("<script>window.location.href='https://smbrand-4543a.web.app/dashboard.html'</script>");
    } catch (e) { 
        console.error("Callback Error:", e.message);
        res.redirect('https://smbrand-4543a.web.app/dashboard.html'); 
    }
});

// Heath check
app.get('/api/health', (req, res) => res.json({ status: "ok" }));

module.exports = app;
