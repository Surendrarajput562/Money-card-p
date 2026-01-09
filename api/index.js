const express = require('express');
const axios = require('axios');
const admin = require('firebase-admin');
const cors = require('cors');
const { HttpsProxyAgent } = require('https-proxy-agent');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');


const app = express();

app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded, common for webhooks

// --- 1. CONFIG VARIABLES (from environment variables) ---
const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY;
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL;
const FIREBASE_DATABASE_URL = "https://smbrand-4543a-default-rtdb.firebaseio.com"; // Your database URL

const ALLAPI_TOKEN = process.env.ALLAPI_TOKEN;
const SHIPROCKET_EMAIL = process.env.SHIPROCKET_EMAIL;
const SHIPROCKET_PASSWORD = process.env.SHIPROCKET_PASSWORD;

const IMG_BB_API_KEY = process.env.IMG_BB_API_KEY; // Not used in this version, but kept for consistency

const apiKeys = (process.env.GEMINI_API_KEY || "").split(",");
let currentKeyIndex = 0;
const DIDIT_API_KEY = process.env.DIDIT_API_KEY;
const DIDIT_WORKFLOW_ID = process.env.DIDIT_WORKFLOW_ID || "5b594327-9f78-4cb1-a233-7d84dbfa88a0";

const SPEED_SECRET_KEY = process.env.SPEED_SECRET_KEY;
const KUCOIN_KEY = process.env.KUCOIN_KEY; // Not used in this version
const KUCOIN_SECRET = process.env.KUCOIN_SECRET; // Not used in this version
const KUCOIN_PASSPHRASE = process.env.KUCOIN_PASSPHRASE; // Not used in this version

const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME;
const OXAPAY_MERCHANT_KEY = process.env.OXAPAY_MERCHANT_KEY;
const OXAPAY_GENERAL_KEY = process.env.OXAPAY_GENERAL_KEY;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const PAN_CLIENT_ID = process.env.PAN_CLIENT_ID; // Cashfree Client ID
const PAN_CLIENT_SECRET = process.env.PAN_CLIENT_SECRET; // Cashfree Client Secret
const ARGOS_IDENTITY_API = process.env.ARGOS_IDENTITY_API;
const SANDBOX_CO_API = process.env.SANDBOX_CO_API;
const SANDBOX_CO_SECRET = process.env.SANDBOX_CO_SECRET;

const CASHFREE_GETWEYAPPID = process.env.CASHFREE_GETWEYAPPID; // For Cashfree PG Orders
const CASHFREE_GETWEYSECRET = process.env.CASHFREE_GETWEYSECRET; // For Cashfree PG Orders

const FIXIE_URL = process.env.FIXIE_URL;
const agent = FIXIE_URL ? new HttpsProxyAgent(FIXIE_URL) : null;

const APP_ID = process.env.AGORA_APP_ID;
const APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE;

// --- CLOUDFLARE R2 CONFIG (For Zero-Bill Video Storage) ---
const R2_ACCESS_KEY = process.env.R2_ACCESS_KEY;
const R2_SECRET_KEY = process.env.R2_SECRET_KEY;
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;


// --- 2. INITIALIZE R2 CLIENT (ZERO BILL ENGINE) ---
const r2Client = new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: R2_ACCESS_KEY,
        secretAccessKey: R2_SECRET_KEY,
    },
});



// --- 1. CONFIG VARIABLES ---
const SHOTSTACK_KEY = process.env.SHOTSTACK_KEY; // <--- ये अब Vercel से खींच लेगा
// --- 2. INITIALIZE FIREBASE ADMIN SDK ---
if (!admin.apps.length) {
    try {
        const cleanKey = FIREBASE_PRIVATE_KEY.trim().replace(/^"|"$/g, '').replace(/\\n/g, '\n');
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: FIREBASE_PROJECT_ID,
                clientEmail: FIREBASE_CLIENT_EMAIL,
                privateKey: cleanKey
            }),
            databaseURL: FIREBASE_DATABASE_URL
        });
        console.log('Firebase Admin SDK initialized in index.js');
    } catch (e) {
        console.error("Firebase Initialization Error in index.js:", e.message);
    }
}
const db = admin.database();
const firebaseAuth = admin.auth(); // Firebase Admin Auth for backend operations

// --- 3. INITIALIZE GEMINI ---
// GEMINI_API_KEY variable ki jagah apiKeys array ki pehli key use kar rahe hain
const firstKey = apiKeys.length > 0 ? apiKeys[0].trim() : null;
const genAI = firstKey ? new GoogleGenerativeAI(firstKey) : null;



// --- 3. INITIALIZE GEMINI ---

// --- 4. NODEMAILER TRANSPORTER ---
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});
const sendAutomationEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: `"MoneyCard Official" <${EMAIL_USER}>`,
            to: to,
            subject: subject,
            html: `<b>Bhai, ye lo aapki details:</b><br>${text}`
        });
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Gmail Auth Failed. Check App Password.", error);
    }
};

// --- 5. HELPER FUNCTIONS ---
const getPanHeaders = () => ({
    'x-client-id': PAN_CLIENT_ID,
    'x-client-secret': PAN_CLIENT_SECRET,
    'Content-Type': 'application/json'
});

const getSpeedHeaders = () => ({
    'Authorization': `Basic ${Buffer.from(`${SPEED_SECRET_KEY}:`).toString('base64')}`,
    'speed-version': '2022-10-15',
    'Content-Type': 'application/json'
});

const getOxaHeaders = (key) => ({
    headers: { 'merchant_api_key': key, 'general_api_key': key, 'Content-Type': 'application/json' }
});


// --- SHIPROCKET AUTHENTICATION ---
let shiprocketToken = null;
let shiprocketTokenExpiry = 0;

async function getShiprocketToken() {
    if (shiprocketToken && Date.now() < shiprocketTokenExpiry) {
        return shiprocketToken;
    }

    try {
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
            email: SHIPROCKET_EMAIL,
            password: SHIPROCKET_PASSWORD
        });
        shiprocketToken = response.data.token;
        shiprocketTokenExpiry = Date.now() + (response.data.expires_in * 1000); // Convert seconds to milliseconds
        console.log('Shiprocket token refreshed.');
        return shiprocketToken;
    } catch (error) {
        console.error('Failed to get Shiprocket token:', error.response ? error.response.data : error.message);
        throw new Error('Shiprocket authentication failed.');
    }
}

// --- SHIPROCKET ORDER CREATION (ONLY CREATE - MANUAL PICKUP) ---
async function createShiprocketOrder(orderData, customerAddress, customerDetails) {
    try {
        if (!SHIPROCKET_EMAIL || !SHIPROCKET_PASSWORD) {
            console.warn('Shiprocket credentials missing.');
            return { shiprocket_status: 'SKIPPED_NO_CREDENTIALS' };
        }

        const token = await getShiprocketToken();

        // 1. Name Split Logic (Last Name NA if missing)
        const fullName = (customerDetails.customer_name || customerDetails.name || 'User').trim();
        const nameParts = fullName.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : "NA";

        // 2. Mobile & Pincode Logic
        const finalPhone = (customerAddress.mobile || customerDetails.customer_mobile || "9999999999").toString().replace(/\D/g, '').slice(-10);
        const finalPincode = (customerAddress.pincode || "110001").toString();

        // 3. Address Length Fix (Min 15 chars)
        let addr1 = customerAddress.house || "";
        if (addr1.length < 15) {
            addr1 = addr1 + " (Delivery to: " + (customerAddress.city || "Area") + ")";
        }

        const shiprocketOrderItems = Object.values(orderData.items).map(item => ({
            name: item.name,
            sku: item.id || 'SKU',
            units: item.quantity,
            selling_price: item.final_price,
            discount: (item.price - item.final_price) || 0,
            tax: 0,
            hsn: 4202,
        }));

        const srPayload = {
            order_id: orderData.id,
            order_date: new Date(orderData.created_at || Date.now()).toISOString().split('T')[0],
            pickup_address: "Primary", 
            comment: `Payment via AllAPI (ID: ${orderData.id})`,
            billing_customer_name: firstName,
            billing_last_name: lastName,
            billing_address: addr1,
            billing_address_2: `${customerAddress.city || ""}, ${customerAddress.district || ""}`,
            billing_city: customerAddress.city || 'Delhi',
            billing_pincode: finalPincode,
            billing_state: customerAddress.state || 'Delhi',
            billing_country: 'India',
            billing_email: customerDetails.customer_email || 'user@example.com',
            billing_phone: finalPhone,
            shipping_is_billing: true,
            order_items: shiprocketOrderItems,
            payment_method: "Prepaid",
            sub_total: orderData.total,
            length: 10, breadth: 10, height: 10, weight: 0.5
        };

        // ⭐ STEP 1: SIRF ORDER CREATE KARO (PAISA NAHI KATEGA)
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', srPayload, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        });

        const srOrderId = response.data.order_id;
        const shipmentId = response.data.shipment_id;

        console.log(`✅ Shiprocket Order Created: ${srOrderId}. Pickup manually via Dashboard.`);

        return {
            shiprocket_order_id: srOrderId,
            shiprocket_shipment_id: shipmentId,
            tracking_id: "PENDING_DASHBOARD", // AWB tab banega jab aap "Ship Now" karoge
            tracking_url: "",
            shiprocket_status: 'NEW',
            message: 'Order created successfully. Go to Dashboard to Ship.'
        };

    } catch (error) {
        console.error('❌ SR Error Detail:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
        return {
            shiprocket_status: 'FAILED',
            message: `SR Error: ${error.response?.data?.message || error.message}`
        };
    }
}

app.post('/api/contact-telegram', async (req, res) => {
    const { name, email, mobile, need, msg } = req.body;
    
    const botToken = '7840966662:AAHqRQbwMOk6ja6pewc3fBMkGUAF7ZKb8ZE'; // Apna bot token daal
    const chatId = '7918796164'; // Apni Chat ID daal
    
    const text = `🚀 *New Lead from MoneyCard*\n\n` +
                 `👤 *Name:* ${name}\n` +
                 `📧 *Email:* ${email}\n` +
                 `📱 *Mobile:* ${mobile}\n` +
                 `🛠️ *Need:* ${need}\n` +
                 `📝 *Message:* ${msg}`;

    try {
        await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            chat_id: chatId,
            text: text,
            parse_mode: 'Markdown'
        });
        res.status(200).send("Success");
    } catch (e) {
        res.status(500).send("Failed");
    }
});



// ==========================================
// --- AUTHENTICATION ENDPOINTS ---
// ==========================================

// --- SIGNUP ---
app.post('/api/signup', async (req, res) => {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }
    if (password.length < 6) {
        return res.status(400).json({ success: false, message: "Password must be at least 6 characters." });
    }

    try {
        // Create user in Firebase Authentication
        const userRecord = await firebaseAuth.createUser({
            email: email,
            password: password,
            displayName: name,
            phoneNumber: mobile
        });

        // Store additional user data in Realtime Database
        await db.ref(`users/${userRecord.uid}`).set({
            uid: userRecord.uid,
            name: name,
            email: email,
            mobile: mobile,
            created_at: admin.database.ServerValue.TIMESTAMP,
            wallet: 0,
            gold_balance: 0,
            signup_bonus_given: false, // Will be set true by frontend on first login
            refer: Math.random().toString(36).substring(2, 8).toUpperCase(), // Generate refer code
        });

        return res.status(200).json({ success: true, message: "User created successfully!", uid: userRecord.uid });

    } catch (error) {
        console.error("Firebase Signup Error:", error.message);
        let errorMessage = "Signup failed. Please try again.";
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = "This email is already registered.";
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = "Invalid email format.";
        }
        return res.status(500).json({ success: false, message: errorMessage });
    }
});


// --- LOGIN (Backend will just confirm login, frontend uses client-side auth) ---
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    try {
        const userRecord = await firebaseAuth.getUserByEmail(email);
        return res.status(200).json({ success: true, message: "Login successful!", uid: userRecord.uid });

    } catch (error) {
        console.error("Firebase Login Error:", error.message);
        let errorMessage = "Login failed. Invalid credentials.";
        if (error.code === 'auth/user-not-found') {
            errorMessage = "User not found.";
        } else if (error.code === 'auth/wrong-password') {
            errorMessage = "Incorrect password.";
        }
        return res.status(401).json({ success: false, message: errorMessage });
    }
});




app.post('/api/create-order', async (req, res) => {
    const {
        user_uid, internal_id, txn_amount, txn_note, product_name,
        customer_name, customer_mobile, customer_email, type,
        redirect_url, order_address, order_items, plan_id, plan_name
    } = req.body;

    // Basic Validation
    if (!user_uid || !internal_id || !txn_amount || !customer_mobile || !type || !redirect_url) {
        return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    const cleanPhone = String(customer_mobile || "").replace(/\D/g, '').slice(-10);
    const cf_order_id = `CF_${internal_id}_${Date.now()}`;
    const allapi_order_id = `ALLAPI_${type}_${internal_id}_${Date.now()}`;

    try {
        // ==========================================
        // ⭐ NEW LOGIC: ONLY FOR SHOPPING CART
        // ==========================================
        if (type === 'cart') {
            console.log("🛒 Shopping Cart: Using Direct Cashfree Logic...");

            await db.ref(`cashfree_transactions_mapping/${cf_order_id}`).set({
                user_uid: user_uid || "unknown",
                internal_id: internal_id,
                plan_name: plan_name || "cart_order",
                amount: parseFloat(txn_amount),
                status: 'awaiting_payment',
                created_at: admin.database.ServerValue.TIMESTAMP
            });

            const cfRes = await axios.post('https://api.cashfree.com/pg/orders', {
                order_id: cf_order_id,
                order_amount: parseFloat(txn_amount).toFixed(2),
                order_currency: "INR",
                customer_details: {
                    customer_id: user_uid,
                    customer_phone: cleanPhone,
                    customer_name: (customer_name || "User").replace(/[^a-zA-Z ]/g, "").trim(),
                    customer_email: customer_email || "user@moneycard.app"
                },
                order_meta: {
                    return_url: `${redirect_url}?order_id=${cf_order_id}`
                }
            }, {
                headers: {
                    'x-client-id': CASHFREE_GETWEYAPPID,
                    'x-client-secret': CASHFREE_GETWEYSECRET,
                    'x-api-version': '2023-08-01',
                    'Content-Type': 'application/json'
                }
            });

            const cf = cfRes.data;
            await db.ref(`cashfree_transactions_mapping/${cf_order_id}`).update({
                cf_order_id: cf.cf_order_id,
                payment_session_id: cf.payment_session_id,
                status: 'initiated',
                updated_at: admin.database.ServerValue.TIMESTAMP
            });

            return res.status(200).json({
                success: true,
                results: {
                    payment_gateway: 'cashfree',
                    payment_session_id: cf.payment_session_id,
                    order_id: cf_order_id
                }
            });
        }

        // ==========================================
        // ⭐ OLD LOGIC: FOR ALL OTHER PAGES (Plans/Recharge)
        // ==========================================
        console.log("💎 Other Page: Using AllAPI + Fallback Logic...");
        
        if (!ALLAPI_TOKEN) return res.status(500).json({ success: false, message: "AllAPI token missing." });

        await db.ref(`allapi_transactions_mapping/${allapi_order_id}`).set({
            user_uid, internal_id, type, txn_amount, status: 'pending',
            created_at: admin.database.ServerValue.TIMESTAMP,
            customer_name, customer_mobile, customer_email,
            plan_id: plan_id || null, plan_name: plan_name || null
        });

        const allapiResponse = await axios.post('https://allapi.in/order/create', {
            token: ALLAPI_TOKEN,
            order_id: allapi_order_id,
            txn_amount, txn_note,
            product_name: product_name || txn_note,
            customer_name, customer_mobile, customer_email, redirect_url
        });

        if (allapiResponse.data.status) {
            await db.ref(`allapi_transactions_mapping/${allapi_order_id}`).update({
                gateway_txn_id: allapiResponse.data.results.txn_id,
                payment_url: allapiResponse.data.results.payment_url,
                status: 'awaiting_payment',
                updated_at: admin.database.ServerValue.TIMESTAMP
            });

            return res.status(200).json({
                success: true,
                results: {
                    payment_gateway: 'allapi',
                    allapi_order_id: allapi_order_id,
                    txn_id: allapiResponse.data.results.txn_id,
                    payment_url: allapiResponse.data.results.payment_url
                }
            });
        }

        // Fallback for non-cart pages
        console.warn("AllAPI Error, switching to Cashfree Fallback...");
        const cfFallbackRes = await axios.post('https://api.cashfree.com/pg/orders', {
            order_id: cf_order_id,
            order_amount: parseFloat(txn_amount).toFixed(2),
            order_currency: "INR",
            customer_details: {
                customer_id: user_uid,
                customer_phone: cleanPhone,
                customer_name: (customer_name || "User").replace(/[^a-zA-Z ]/g, "").trim()
            },
            order_meta: { return_url: `${redirect_url}?order_id=${internal_id}` }
        }, {
            headers: {
                'x-client-id': CASHFREE_GETWEYAPPID,
                'x-client-secret': CASHFREE_GETWEYSECRET,
                'x-api-version': '2023-08-01',
                'Content-Type': 'application/json'
            }
        });

        return res.status(200).json({
            success: true,
            results: {
                payment_gateway: 'cashfree',
                payment_session_id: cfFallbackRes.data.payment_session_id,
                order_id: cf_order_id
            }
        });

    } catch (error) {
        console.error("Gateway Final Error:", error.response ? error.response.data : error.message);
        return res.status(500).json({ success: false, message: "All payment gateways failed." });
    }
});


app.post('/api/pay', async (req, res) => {
    let orderId = "";
    try {
        const { amount, phone, name, user_uid, plan_id, plan_name } = req.body;
        const cleanPhone = String(phone || "").replace(/\D/g, '').slice(-10);
        
        // Prefix 'EBOOK_' taaki webhook shopping se confuse na ho
        orderId = `EBOOK_${plan_id || 'sub'}_${user_uid || 'anon'}_${Date.now()}`;

        // 1. Initial Entry with basic data
        await db.ref(`cashfree_transactions_mapping/${orderId}`).set({
            user_uid: user_uid || "unknown",
            plan_name: plan_name || "standard",
            amount: parseFloat(amount || 0),
            type: 'subscription', // 🔥 Important for activation
            status: 'awaiting_payment',
            created_at: admin.database.ServerValue.TIMESTAMP
        });

        // 2. Cashfree API Call
        const response = await axios.post('https://api.cashfree.com/pg/orders', {
            order_id: orderId,
            order_amount: parseFloat(amount).toFixed(2),
            order_currency: "INR",
            customer_details: {
                customer_id: user_uid || "CUST_" + Date.now(),
                customer_phone: cleanPhone,
                customer_name: (name || "User").replace(/[^a-zA-Z ]/g, "").trim()
            },
            order_meta: {
                return_url: `https://moneycard.space/ebook.html?order_id=${orderId}`
            }
        }, {
            headers: {
                'x-client-id': CASHFREE_GETWEYAPPID,
                'x-client-secret': CASHFREE_GETWEYSECRET,
                'x-api-version': '2023-08-01',
                'Content-Type': 'application/json'
            }
        });

        // 3. CLEAN UPDATE LOGIC (No lines deleted)
        const cf = response.data;
        const rawUpdate = {
            cf_order_id: cf.cf_order_id,
            payment_session_id: cf.payment_session_id,
            payment_link: cf.payment_link || null,
            status: 'initiated',
            updated_at: admin.database.ServerValue.TIMESTAMP
        };

        const cleanUpdate = Object.fromEntries(
            Object.entries(rawUpdate).filter(([_, v]) => v !== undefined)
        );

        // Map it for both local and CF reference
        await db.ref(`cashfree_transactions_mapping/${orderId}`).update(cleanUpdate);
        
        // Add direct reference for Webhook (Optimization to prevent 404 in webhook)
        await db.ref(`cashfree_transactions_mapping/${cf.cf_order_id}`).set({
            original_order_id: orderId,
            user_uid: user_uid,
            type: 'subscription'
        });

        // 4. Return to Frontend
        res.status(200).json({
            success: true,
            payment_session_id: cf.payment_session_id,
            order_id: orderId
        });

    } catch (error) {
        const errorData = error.response ? error.response.data : error.message;
        console.error("CASHFREE_ERROR:", errorData);

        if (orderId) {
            await db.ref(`cashfree_transactions_mapping/${orderId}`).update({
                status: 'failed',
                error: typeof errorData === 'string' ? errorData : "Gateway Rejected"
            }).catch(() => {});
        }
        res.status(400).json({ success: false, message: "Payment Initiation Failed" });
    }
});


// ==========================================
// --- 2FA CHECK ENDPOINT ---
// ==========================================
app.post('/api/2fa/check', async (req, res) => {
    const { userId } = req.body;
    const snap = await db.ref(`users/${userId}/2fa_settings`).once('value');
    const data = snap.val();

    if (data && data.secret) {
        return res.json({ setup_done: true });
    } else {
        const secret = speakeasy.generateSecret({ name: `MoneyCard (${userId})` });
        const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);

        await db.ref(`users/${userId}/2fa_settings`).set({
            secret: secret.base32,
            setup_done: false
        });

        res.json({ setup_done: false, qr_code: qrCodeUrl, secret: secret.base32 });
    }
});

// ==========================================
// --- LOGIC: AUTO-SWITCHER AI ENGINE ---
// ==========================================
app.post('/api/ai-chat', async (req, res) => {
    const { prompt, history, userId } = req.body;
    if (!prompt) return res.status(400).json({ error: "No prompt" });
    if (!genAI) return res.status(500).json({ error: "AI service not initialized (GEMINI_API_KEY missing?)" });

    const modelList = ["gemini-1.5-flash", "gemini-1.0-pro", "gemini-pro"];
    let finalReply = "";
    let success = false;

    for (let modelName of modelList) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const chat = model.startChat({ history: history || [] });
            const result = await chat.sendMessage(prompt);
            const response = await result.response;
            if (response.text()) {
                finalReply = response.text();
                success = true;
                break;
            }
        } catch (e) {
            console.log(`Model ${modelName} failed, switching...`, e.message);
        }
    }

    if (!success) {
        finalReply = "Sorry, I am having trouble connecting to my AI brain. Please try again later.";
    }

    if (userId) db.ref(`users/${userId}/chat_history`).push({ p: prompt, r: finalReply, ts: admin.database.ServerValue.TIMESTAMP });
    res.json({ success: true, reply: finalReply });
});


// --- 2FA VERIFY ENDPOINT ---
app.post('/api/2fa/verify', async (req, res) => {
    const { userId, token } = req.body;
    const snap = await db.ref(`users/${userId}/2fa_settings`).once('value');
    const data = snap.val();

    if (!data || !data.secret) return res.status(400).json({ success: false, message: "2FA not set up." });

    const verified = speakeasy.totp.verify({
        secret: data.secret,
        encoding: 'base32',
        token: token
    });

    if (verified) {
        await db.ref(`users/${userId}/2fa_settings`).update({ setup_done: true });
        res.json({ success: true });
    } else {
        res.json({ success: false, message: "Invalid 2FA token." });
    }
});


// --- Speed Headers ---
const speedHeaders = getSpeedHeaders(); // Use the helper

app.post('/api/speed/add-crypto', async (req, res) => {
    const { userId, amount, assetType } = req.body;

    try {
        const response = await axios.post('https://api.tryspeed.com/checkout-sessions', {
            amount: parseFloat(amount),
            currency: 'USD',
            target_currency: assetType === 'SATS' ? 'BTC' : assetType,
            payment_methods: assetType === 'SATS' ? ['lightning'] : ['onchain'],
            metadata: { user_id: userId, asset: assetType },

            success_url: `https://moneycard-8f457.web.app/dashboard.html`,
            cancel_url: `https://moneycard-8f457.web.app/add-crypto.html`
        }, { headers: speedHeaders });

        res.json({ success: true, url: response.data.url });

    } catch (e) {
        console.error("Speed API Error:", e.response?.data || e.message);
        res.status(500).json({ success: false, message: "Gateway Connection Error" });
    }
});


app.post('/api/speed/withdraw', async (req, res) => {
    const { userId, amountUSD, assetType, email } = req.body;
    const amount = parseFloat(amountUSD);

    try {
        const walletRef = db.ref(`users/${userId}/wallets/${assetType}`);

        const result = await walletRef.transaction((current) => {
            if (current === null || (current.balance || 0) < amount) {
                return;
            }
            return { ...current, balance: (current.balance || 0) - amount };
        });

        if (!result.committed) {
            return res.status(400).json({ success: false, message: "Insufficient balance." });
        }

        try {
            const response = await axios.post('https://api.tryspeed.com/withdrawal-links', {
                amount: amount,
                currency: 'USD',
                target_currency: assetType === 'SATS' ? 'SATS' : assetType,
                email: email || "user@moneycard.space",
                metadata: { user_id: userId, asset: assetType }
            }, { headers: speedHeaders });

            res.json({ success: true, withdraw_url: response.data.url });

        } catch (apiErr) {
            console.error("Speed API Failed, Refunding...", apiErr.response?.data || apiErr.message);
            await walletRef.transaction((current) => {
                if (current) current.balance = (current.balance || 0) + amount;
                return current;
            });

            const errorMsg = apiErr.response?.data?.errors?.[0]?.message || "Gateway Offline";
            return res.status(500).json({ success: false, message: `Speed Error: ${errorMsg}. Balance Refunded.` });
        }

    } catch (e) {
        console.error("Server Error in Speed Withdraw:", e);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});


// ==========================================================
// --- NEW: DIDIT REAL-TIME STATUS CHECK (404 FIX) ---
// ==========================================================
app.post('/api/check-kyc-status', async (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ success: false, message: "User ID missing" });

    try {
        const snapshot = await db.ref(`users/${userId}/profile`).once('value');
        const profile = snapshot.val() || {};

        let liveStatus = "NEW";
        try {
            const diditRes = await axios.get(`https://api.didit.me/v1/sessions?vendor_data=${userId}`, {
                headers: { 'Authorization': `Bearer ${DIDIT_API_KEY}` }
            });

            if (diditRes.data.results && diditRes.data.results.length > 0) {
                const latest = diditRes.data.results[0];
                liveStatus = latest.status.toUpperCase();
            }
        } catch (apiErr) {
            console.log("Didit API error, using DB fallback");
            liveStatus = (profile.kyc_status || "NEW").toUpperCase();
        }

        if (liveStatus === 'COMPLETED' || liveStatus === 'APPROVED') {
            await db.ref(`users/${userId}/profile`).update({ kyc_status: 'VERIFIED', step: 'COMPLETED' });
            return res.json({ success: true, status: 'VERIFIED' });
        }

        if (liveStatus === 'PENDING' || liveStatus === 'IN_REVIEW') {
            await db.ref(`users/${userId}/profile`).update({ kyc_status: 'PENDING' });
            return res.json({ success: true, status: 'PENDING' });
        }

        if (liveStatus === 'REJECTED' || liveStatus === 'FAILED') {
            await db.ref(`users/${userId}/profile`).update({ kyc_status: 'REJECTED' });
            return res.json({ success: true, status: 'REJECTED' });
        }

        res.json({ success: true, status: 'NEW' });

    } catch (error) {
        console.error("Server Error in check-kyc-status:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
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
        { pan: req.body.pan.toUpperCase() }, { httpsAgent: agent, headers: getPanHeaders() });

        const newBalance = req.currentBalance - 1;
        await db.ref(`users/${req.devUid}/api_settings/balance`).set(newBalance);

        res.json({ success: true, registered_name: response.data.registered_name, remaining: newBalance });
    } catch (e) { res.status(500).json({ success: false }); }
});

// 3. BANK SYNC (₹2)
app.post('/api/v1/bank-sync', validateDevAndDeduct, async (req, res) => {
    try {
        const { bank_account, ifsc } = req.body;
        const response = await axios.post("https://api.cashfree.com/verification/bank-account/sync",
        { bank_account, ifsc, name: "Dev Test", phone: "9999999999" }, { httpsAgent: agent, headers: getPanHeaders() });

        const newBalance = req.currentBalance - 2;
        await db.ref(`users/${req.devUid}/api_settings/balance`).set(newBalance);

        res.json({ success: true, data: response.data, remaining: newBalance });
    } catch (e) { res.status(500).json({ success: false }); }
});

// --- NEW: DEVELOPER v1 ARGOS VERIFY (₹5 Deduction) ---
app.post('/api/v1/argos-verify', validateDevAndDeduct, async (req, res) => {
    const { idNumber, idType, country, name } = req.body;
    try {
        const response = await axios.post('https://api.argos-identity.com/v1/verify', {
            customer_id: req.devUid,
            name: name,
            id_type: idType,
            id_number: idNumber,
            issuing_country: country
        }, { headers: { 'x-api-key': ARGOS_IDENTITY_API, 'Content-Type': 'application/json' } });

        const newBalance = req.currentBalance - 5;
        await db.ref(`users/${req.devUid}/api_settings/balance`).set(newBalance);

        res.json({ success: true, data: response.data, remaining: newBalance });
    } catch (e) { res.status(500).json({ success: false, message: "Argos API Error" }); }
});

// 3. VEHICLE RC STATUS (₹1)
app.get('/api/v1/vehicle-rc/:regNo', validateDevAndDeduct, async (req, res) => {
    try {
        const response = await axios.get(`https://api.cashfree.com/verification/vehicle-rc?reg_no=${req.params.regNo}`, { httpsAgent: agent, headers: getPanHeaders() });

        const newBalance = req.currentBalance - 1;
        await db.ref(`users/${req.devUid}/api_settings/balance`).set(newBalance);

        res.json({ success: true, data: response.data, remaining: newBalance });
    } catch (e) {
        console.error("Cashfree RC API Error:", e.response ? e.response.data : e.message);
        res.status(e.response ? e.response.status : 500).json({ success: false, message: e.response ? e.response.data.message : "Internal Server Error" });
    }
});

// 4. ADVANCE EMPLOYMENT VERIFY (₹5)
app.post('/api/v1/verify-employment', validateDevAndDeduct, async (req, res) => {
    try {
        const response = await axios.post(`https://api.cashfree.com/verification/advance-employment`,
        { verification_id: req.body.verification_id || `emp_${Date.now()}`, phone: req.body.phone },
        { httpsAgent: agent, headers: getPanHeaders() });

        const newBalance = req.currentBalance - 5;
        await db.ref(`users/${req.devUid}/api_settings/balance`).set(newBalance);

        res.json({ success: true, data: response.data, remaining: newBalance });
    } catch (e) { res.status(500).json({ success: false, message: "Employment API Error" }); }
});

// 5. VOTER ID VERIFY (₹2)
app.post('/api/v1/verify-voterid', validateDevAndDeduct, async (req, res) => {
    try {
        const response = await axios.post(`https://api.cashfree.com/verification/voter-id`,
        { verification_id: req.body.verification_id || `voter_${Date.now()}`, epic_number: req.body.epic_number, name: req.body.name },
        { httpsAgent: agent, headers: getPanHeaders() });

        const newBalance = req.currentBalance - 2;
        await db.ref(`users/${req.devUid}/api_settings/balance`).set(newBalance);

        res.json({ success: true, data: response.data, remaining: newBalance });
    } catch (e) { res.status(500).json({ success: false }); }
});

// 6. PASSPORT VERIFY (₹6)
app.post('/api/v1/verify-passport', validateDevAndDeduct, async (req, res) => {
    try {
        const response = await axios.post(`https://api.cashfree.com/verification/passport`,
        req.body, { httpsAgent: agent, headers: getPanHeaders() });

        const newBalance = req.currentBalance - 6;
        await db.ref(`users/${req.devUid}/api_settings/balance`).set(newBalance);

        res.json({ success: true, data: response.data, remaining: newBalance });
    } catch (e) { res.status(500).json({ success: false }); }
});

// 7. DRIVING LICENSE VERIFY (₹3)
app.post('/api/v1/verify-dl', validateDevAndDeduct, async (req, res) => {
    try {
        const response = await axios.post(`https://api.cashfree.com/verification/driving-license`,
        req.body, { httpsAgent: agent, headers: getPanHeaders() });

        const newBalance = req.currentBalance - 3;
        await db.ref(`users/${req.devUid}/api_settings/balance`).set(newBalance);

        res.json({ success: true, data: response.data, remaining: newBalance });
    } catch (e) { res.status(500).json({ success: false }); }
});

// 8. FACE LIVENESS CHECK (₹5)
app.post('/api/v1/face-liveness', validateDevAndDeduct, async (req, res) => {
    try {
        const response = await axios.post(`https://api.cashfree.com/verification/face-liveness`,
        req.body, { httpsAgent: agent, headers: { ...getPanHeaders(), 'Content-Type': 'multipart/form-data' } });

        const newBalance = req.currentBalance - 5;
        await db.ref(`users/${req.devUid}/api_settings/balance`).set(newBalance);

        res.json({ success: true, data: response.data, remaining: newBalance });
    } catch (e) { res.status(500).json({ success: false }); }
});

// 9. NAME MATCH (₹2)
app.post('/api/v1/name-match', validateDevAndDeduct, async (req, res) => {
    try {
        const response = await axios.post(`https://api.cashfree.com/verification/name-match`,
        req.body, { httpsAgent: agent, headers: getPanHeaders() });

        const newBalance = req.currentBalance - 2;
        await db.ref(`users/${req.devUid}/api_settings/balance`).set(newBalance);

        res.json({ success: true, score: response.data.score, remaining: newBalance });
    } catch (e) { res.status(500).json({ success: false }); }
});

// 10. REVERSE GEOCODING (₹2)
app.post('/api/v1/reverse-geocode', validateDevAndDeduct, async (req, res) => {
    try {
        const response = await axios.post(`https://api.cashfree.com/verification/reverse-geocoding`,
        req.body, { httpsAgent: agent, headers: getPanHeaders() });

        const newBalance = req.currentBalance - 2;
        await db.ref(`users/${req.devUid}/api_settings/balance`).set(newBalance);

        res.json({ success: true, address: response.data.address, remaining: newBalance });
    } catch (e) { res.status(500).json({ success: false }); }
});


app.post('/api/v1/recharge', async (req, res) => {
    let orderId = "";
    try {
        const { uid, email, amount } = req.body;
        orderId = `WAL_${Date.now()}_${uid.substring(0, 5)}`.toUpperCase();

        // 1. Initial Entry (Wallet Type)
        await db.ref(`cashfree_transactions_mapping/${orderId}`).set({
            user_uid: uid,
            amount: parseFloat(amount),
            type: 'wallet',
            status: 'awaiting_payment',
            created_at: admin.database.ServerValue.TIMESTAMP
        });

        // 2. Direct Axios Call (Sahi Headers ke saath)
        const response = await axios.post('https://api.cashfree.com/pg/orders', {
            order_id: orderId,
            order_amount: parseFloat(amount).toFixed(2),
            order_currency: "INR",
            customer_details: {
                customer_id: uid,
                customer_phone: "9999999999",
                customer_email: email || "dev@moneycard.space"
            },
            order_meta: {
                return_url: `https://money-card-p.vercel.app/api/v1/verify-payment?order_id=${orderId}&uid=${uid}`
            }
        }, {
            headers: {
                'x-client-id': CASHFREE_GETWEYAPPID,
                'x-client-secret': CASHFREE_GETWEYSECRET,
                'x-api-version': '2023-08-01',
                'Content-Type': 'application/json'
            }
        });

        const cf = response.data;
        // 3. Mapping update for Webhook safety
        await db.ref(`cashfree_transactions_mapping/${orderId}`).update({
            payment_session_id: cf.payment_session_id,
            status: 'initiated'
        });

        res.status(200).json({
            success: true,
            payment_session_id: cf.payment_session_id,
            order_id: orderId
        });

    } catch (error) {
        console.error("RECHARGE_ERROR:", error.response ? error.response.data : error.message);
        res.status(400).json({ success: false, message: "Recharge Initiation Failed" });
    }
});


app.get('/api/v1/verify-payment', async (req, res) => {
    const { order_id, uid } = req.query;
    if (!order_id || !uid) return res.send("Missing Data");

    try {
        // 1. Check status from Cashfree (Direct Axios)
        const response = await axios.get(`https://api.cashfree.com/pg/orders/${order_id}/payments`, {
            headers: {
                'x-client-id': CASHFREE_GETWEYAPPID,
                'x-client-secret': CASHFREE_GETWEYSECRET,
                'x-api-version': '2023-08-01'
            }
        });

        // 2. Find SUCCESS payment
        const payments = response.data;
        const success = payments.find(p => p.payment_status === "SUCCESS");

        if (success) {
            const amount = success.order_amount;
            
            // 3. Transaction use karo taaki balance sahi se add ho
            const balanceRef = db.ref(`users/${uid}/api_settings/balance`);
            await balanceRef.transaction(current => (Number(current) || 0) + Number(amount));

            // 4. Update transaction status
            await db.ref(`cashfree_transactions_mapping/${order_id}`).update({ 
                status: 'SUCCESS',
                updated_at: admin.database.ServerValue.TIMESTAMP 
            });

            res.redirect('https://moneycard.space/dev-portal.html?recharge=success');
        } else {
            res.redirect('https://moneycard.space/dev-portal.html?recharge=failed');
        }
    } catch (e) {
        console.error("Verify Error:", e.response ? e.response.data : e.message);
        res.redirect('https://moneycard.space/dev-portal.html?recharge=error');
    }
});





























// ==========================================================
// --- SECTION 2: USER PORTAL (INTERNAL - CASHFREE KYCs) ---
// ==========================================================

// --- PAN VERIFY ---
app.post('/api/verify-pan', async (req, res) => {
    const { pan, userId } = req.body;
    try {
        const response = await axios.post(`https://api.cashfree.com/verification/pan`,
        { pan: pan.toUpperCase() }, { httpsAgent: agent, headers: getPanHeaders() });
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
        }, { httpsAgent: agent, headers: getPanHeaders() });
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
            httpsAgent: agent, headers: getPanHeaders()
        });
        await db.ref(`users/${userId}/profile`).update({ step: 'COMPLETED' });
        res.send("<script>window.location.href='https://moneycard-8f457.web.app/index.html'</script>");
    } catch (e) {
        console.error("Digilocker Callback Error:", e);
        res.redirect('https://moneycard-8f457.web.app/index.html');
    }
});


// --- USER PORTAL - BANK SYNC (CASHFREE FLOW) ---
app.post('/api/verify-bank-sync', async (req, res) => {
    const { userId, bank_account, ifsc, name, phone, pan_number } = req.body;

    if (!userId || !bank_account || !ifsc) {
        return res.status(400).json({ success: false, message: "Details incomplete!" });
    }

    try {
        const response = await axios.post(
            "https://api.cashfree.com/verification/bank-account/sync",
            {
                bank_account: bank_account,
                ifsc: ifsc.toUpperCase(),
                name: name || "Merchant",
                phone: phone || "916268520141"
            },
            {
                headers: getPanHeaders(),
                httpsAgent: agent
            }
        );

        const d = response.data;

        if (d.status === "SUCCESS" || d.sub_code === "200") {
            const firebaseData = {
                bank_info: {
                    account_number: bank_account,
                    ifsc: ifsc.toUpperCase(),
                    bank_name: d.bank_name,
                    branch: d.branch,
                    city: d.city,
                    micr: d.micr,
                    account_status: d.status || "VALID"
                },
                kyc_details: {
                    name_at_bank: d.name_at_bank,
                    provided_name: name,
                    pan_card: pan_number || "N/A"
                },
                meta: {
                    reference_id: d.reference_id,
                    verification_id: d.verification_id,
                    verified_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
                }
            };

            await db.ref(`users/${userId}/bank_details`).set(firebaseData);
            await db.ref(`users/${userId}/profile`).update({ step: 'BANK_ADDED' });

            return res.json({ success: true, name: d.name_at_bank, data: firebaseData });
        } else {
            return res.status(400).json({ success: false, message: d.message || "Invalid Bank Details" });
        }
    } catch (e) {
        console.error("Internal Bank Sync Error:", e.response?.data || e.message);
        res.status(500).json({ success: false, error: "Gateway Auth Error" });
    }
});

// --- SECTION: 2FA & DASHBOARD SECURITY ---
app.get('/api/user/status', async (req, res) => {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: "User ID missing" });

    try {
        const snap = await db.ref(`users/${userId}`).once('value');
        const user = snap.val();

        res.json({
            kyc: user?.profile?.kyc_status || 'NEW',
            twoFA: user?.['2fa_settings']?.setup_done || false,
            bank: !!user?.bank_details
        });
    } catch (e) {
        console.error("Error fetching user status:", e);
        res.status(500).json({ error: e.message });
    }
});


// ==========================================
// --- SECTION 3: GLOBAL PAY MONEY CARD QR ---
// ==========================================
app.post('/api/create-global-qr', async (req, res) => {
    const { name, description, userId, selected_currency, networks } = req.body;

    const final_currency = selected_currency || "USDT";
    const primary_method = (networks && networks.length > 0) ? networks[0] : "ethereum";

    try {
        const response = await axios.post('https://api.tryspeed.com/oneqrs', {
            name: name || `Global Pay QR`,
            method: primary_method,
            currency: final_currency,
            target_currency: final_currency,
            description: description || "Money Card Multi-Currency Payment"
        }, { headers: getSpeedHeaders() });

        const qr_link = response.data.url || "";
        const qr_id = response.data.id || "";

        if (userId && qr_link) {
            await db.ref(`users/${userId}/latest_qr`).set({
                qr_id: qr_id,
                qr_url: qr_link,
                currency: final_currency,
                method: primary_method,
                qr_name: name || "Global Pay QR",
                updated_at: admin.database.ServerValue.TIMESTAMP
            });
        }

        res.json({
            success: true,
            qr_url: qr_link,
            qr_id: qr_id,
            message: "Speed QR Created!"
        });

    } catch (e) {
        console.error("Speed API Error creating QR:", e.response ? e.response.data : e.message);
        res.status(500).json({
            success: false,
            message: e.response?.data?.errors?.[0]?.message || "Failed to create Speed QR"
        });
    }
});


app.get('/api/global-tools', async (req, res) => {
    const { action, zip, country } = req.query;

    if (action === 'geonames') {
        try {
            const username = GEONAMES_USERNAME;

            const geoRes = await axios.get(`http://api.geonames.org/postalCodeLookupJSON?postalcode=${zip}&country=${country}&username=${username}`);

            if (geoRes.data.postalcodes?.length > 0) {
                const p = geoRes.data.postalcodes[0];
                return res.json({
                    success: true,
                    city: p.adminName2 || p.placeName,
                    state: p.adminName1
                });
            }
            return res.json({ success: false, message: "No location found" });
        } catch (e) {
            console.error("Geonames API Error:", e);
            return res.status(500).json({ success: false, error: e.message });
        }
    }
    return res.status(400).json({ success: false, message: "Invalid action for global-tools." });
});

// Create Session
app.post('/api/create-didit-session', async (req, res) => {
    const { userId } = req.body;
    try {
        const response = await axios.post('https://api.didit.me/v1/sessions', {
            workflowId: DIDIT_WORKFLOW_ID,
            vendorData: userId,
            redirect_url: `https://moneycard-8f457.web.app/index.html` // Redirect to frontend dashboard
        }, {
            headers: { 'Authorization': `Bearer ${DIDIT_API_KEY}`, 'Content-Type': 'application/json' }
        });
        res.json({ success: true, url: response.data.url });
    } catch (e) {
        console.error("Didit Create Session Error:", e.response?.data || e.message);
        res.status(500).json({ success: false, message: "Failed to create Didit session." });
    }
});


app.post('/api/speed/swap', async (req, res) => {
    const { userId, amountUSD, fromAsset, toAsset } = req.body;
    try {
        const speedRes = await axios.post('https://api.tryspeed.com/balances/swap', {
            amount: amountUSD.toString(),
            currency: 'USD',
            target_currency_swap_out: fromAsset === 'BTC' ? 'SATS' : fromAsset,
            target_currency_swap_in: toAsset === 'BTC' ? 'SATS' : toAsset
        }, { headers: getSpeedHeaders() });

        const received = speedRes.data.target_amount_swapped;
        const ref = db.ref(`users/${userId}/wallets`);

        await ref.transaction((w) => {
            if (w) {
                const fKey = fromAsset === 'BTC' ? 'SATS' : fromAsset;
                const tKey = toAsset === 'BTC' ? 'SATS' : toAsset;
                if(w[fKey]) w[fKey].balance = (w[fKey].balance || 0) - parseFloat(amountUSD);
                if(w[tKey]) w[tKey].balance = (w[tKey].balance || 0) + parseFloat(received);
            }
            return w;
        });

        res.json({ success: true, received });
    } catch (e) {
        console.error("Speed Swap Error:", e.response?.data || e.message);
        res.status(500).json({ success: false, message: "Speed swap failed." });
    }
});


// STATIC ADDRESS: Firebase check + Auto Generate
app.post('/api/oxa/static', async (req, res) => {
    const { userId, coin } = req.body;
    try {
        const addrRef = db.ref(`users/${userId}/wallets/oxapay_addresses/${coin}`);
        const snap = await addrRef.once('value');
        if (snap.exists()) return res.json({ status: 200, data: snap.val() });

        const r = await axios.post('https://api.oxapay.com/v1/payment/static-address', {
            network: (coin === 'BTC' || coin === 'ETH') ? coin : 'TRON',
            to_currency: coin,
            callback_url: "https://money-card-p.vercel.app/api/webhook", // OxaPay webhook points to our webhook handler
            order_id: userId // OxaPay uses order_id to identify
        }, getOxaHeaders(OXAPAY_MERCHANT_KEY));

        if (r.data.status === 200) await addrRef.set(r.data.data);
        res.json(r.data);
    } catch (e) {
        console.error("OxaPay Static Address Error:", e.response?.data || e.message);
        res.status(500).json({ error: "Failed to get OxaPay static address." });
    }
});

// YOUR CORRECT BALANCE LOGIC
app.get('/api/oxa/balance', async (req, res) => {
    try {
        const r = await axios.get('https://api.oxapay.com/v1/general/account/balance', getOxaHeaders(OXAPAY_GENERAL_KEY));
        res.json(r.data);
    } catch (e) {
        console.error("OxaPay Balance Error:", e.response?.data || e.message);
        res.status(500).json({ status: 400, message: "Failed to fetch OxaPay balance." });
    }
});

// MARKET PRICES (Real-time Prices for UI)
app.get('/api/oxa/prices', async (req, res) => {
    try {
        const r = await axios.get('https://api.oxapay.com/v1/general/info/currencies', getOxaHeaders(OXAPAY_GENERAL_KEY));
        res.json(r.data);
    } catch (e) {
        console.error("OxaPay Prices Error:", e.response?.data || e.message);
        res.status(500).json({ error: "Failed to fetch OxaPay prices." });
    }
});

// YOUR CORRECT CALCULATION LOGIC
app.post('/api/oxa/calculate', async (req, res) => {
    try {
        const r = await axios.post('https://api.oxapay.com/v1/general/swap/calculate', req.body, getOxaHeaders(OXAPAY_GENERAL_KEY));
        res.json(r.data);
    } catch (e) {
        console.error("OxaPay Calculate Error:", e.response?.data || e.message);
        res.status(500).json({ status: 400, message: "Failed to calculate OxaPay swap." });
    }
});


// 1. Sandbox.co.in Session Create
app.post('/api/create-sandbox-session', async (req, res) => {
    try {
        const tokenResponse = await axios.post('https://api.sandbox.co.in/authenticate', {}, {
            headers: {
                'x-api-key': SANDBOX_CO_API,
                'x-api-secret': SANDBOX_CO_SECRET,
                'x-api-version': '1.0'
            }
        });
        const token = tokenResponse.data.access_token;

        const response = await axios.post('https://api.sandbox.co.in/kyc/entitylocker-sdk/sessions/create', {
            "@entity": "in.co.sandbox.kyc.entitylocker.sdk.session_request",
            "flow": "signin",
            "doc_types": ["bank_statement"]
        }, {
            headers: {
                'Authorization': token,
                'x-api-key': SANDBOX_CO_API,
                'x-api-version': '1.0',
                'Content-Type': 'application/json'
            }
        });
        res.json({ success: true, sessionId: response.data.data.id });
    } catch (e) {
        console.error("Sandbox Create Session Error:", e.response ? e.response.data : e.message);
        res.status(500).json({
            success: false,
            message: e.response ? e.response.data.message : "Internal Server Error"
        });
    }
});

// 2. Sandbox.co.in Data Fetch
app.get('/api/get-sandbox-balance/:sessionId', async (req, res) => {
    try {
        const tokenResponse = await axios.post('https://api.sandbox.co.in/authenticate', {}, {
            headers: {
                'x-api-key': SANDBOX_CO_API,
                'x-api-secret': SANDBOX_CO_SECRET,
                'x-api-version': '1.0'
            }
        });
        const token = tokenResponse.data.access_token;

        const response = await axios.get(`https://api.sandbox.co.in/kyc/entitylocker-sdk/sessions/${req.params.sessionId}/data`, {
            headers: {
                'Authorization': token,
                'x-api-key': SANDBOX_CO_API,
                'x-api-version': '1.0'
            }
        });

        const bank = response.data.data.find(d => d.content && d.content.summary);
        if (bank) {
            res.json({
                success: true,
                balance: bank.content.summary.current_balance,
                name: bank.content.summary.account_holder_name
            });
        } else {
            res.json({ success: false, message: "No data found yet" });
        }
    } catch (e) {
        console.error("Sandbox Get Balance Error:", e.response ? e.response.data : e.message);
        res.status(500).json({ success: false, message: "Fetch failed" });
    }
});

// ==========================================
// --- SMART WEBHOOK: FOR CASHFREE & ALLAPI ---
// ==========================================
app.post('/api/webhook', async (req, res) => {
    console.log("🔔 Webhook Received Raw:", JSON.stringify(req.body));

    try {
        const data = req.body.data || req.body;
        const orderObj = data.order || data;
        const cfOrderId = orderObj.order_id || orderObj.internal_id;
        const paymentStatus = (data.payment?.payment_status || data.status || "").toUpperCase();

        if (paymentStatus === "SUCCESS") {
            // 1. Mapping se User ID aur Plan nikalo
            const mappingSnap = await db.ref(`cashfree_transactions_mapping/${cfOrderId}`).once('value');
            const mapping = mappingSnap.val() || {};

            // 🔥 LOGIC CHANGE: ID se UID nikalne ka fallback improve kiya
            // Order ID format: CF_planid_UID_timestamp
            const idParts = cfOrderId.split('_');
            const user_uid = mapping.user_uid || idParts[2] || "unknown"; 
            const amount = mapping.amount || data.payment?.payment_amount || 0;

            // --- 🔥 SMART AUTO-DETECTION LOGIC ---
            let type = mapping.type;
            if (!type) {
                // Agar mapping nahi mili, toh ID check karo (Robust Logic)
                const lowerId = cfOrderId.toLowerCase();
                if (lowerId.includes('standard') || lowerId.includes('premium') || lowerId.includes('sub')) {
                    type = 'subscription';
                } else if (cfOrderId.startsWith('ORDER_') || cfOrderId.startsWith('o')) {
                    type = 'cart';
                } else {
                    type = 'wallet';
                }
            }

            console.log(`🎯 Detected Type: ${type} for User: ${user_uid}`);

            // 2. ACTION BASED ON TYPE
            if (type === 'subscription') {
                // ✅ EBOOK ACTIVATION (Fixed path to match your frontend check)
                await db.ref(`users/${user_uid}/ebook_subscriptions/${cfOrderId}`).set({
                    is_active: true,
                    plan_id: mapping.plan_id || idParts[1] || 'standard_plan',
                    amount: amount,
                    status: 'paid',
                    activated_at: admin.database.ServerValue.TIMESTAMP
                });

                // User Profile update (This is what frontend reads)
                await db.ref(`users/${user_uid}/profile`).update({
                    has_active_ebook: true,
                    plan_active: true, // Extra flag for safety
                    last_plan: mapping.plan_name || idParts[1] || "Standard"
                });
                console.log(`✅ Ebook Activated for: ${user_uid}`);

            } else if (type === 'wallet') {
                // 💰 WALLET CREDIT
                const walletRef = db.ref(`users/${user_uid}/wallet`);
                await walletRef.transaction(current => (Number(current) || 0) + Number(amount));
                console.log(`✅ Wallet Credited for: ${user_uid}`);

            } else if (type === 'cart') {
                // 🛒 SHOPPING ORDER
                await db.ref(`orders/${cfOrderId}`).update({ 
                    status: 'paid', 
                    paid_at: admin.database.ServerValue.TIMESTAMP 
                });
                console.log(`✅ Order Marked Paid: ${cfOrderId}`);
            }

            // Transaction History Update
            await db.ref(`cashfree_transactions_mapping/${cfOrderId}`).update({ 
                status: 'SUCCESS',
                updated_at: admin.database.ServerValue.TIMESTAMP 
            });
        }

        res.status(200).send('OK');
    } catch (error) {
        console.error("❌ Webhook Error:", error.message);
        res.status(500).send('Webhook Processing Failed');
    }
});




app.get('/api/google-feed', async (req, res) => {
    try {
        const snap = await db.ref('products').once('value');
        const products = snap.val() || {};

        let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
<channel>
    <title>Money Card Premium Store</title>
    <link>https://moneycard.space</link>
    <description>Premium Lifestyle Products</description>`;

        Object.keys(products).forEach(id => {
            const p = products[id];
            const finalPrice = p.discount ? (p.price - (p.price * p.discount / 100)).toFixed(2) : p.price;

            // 🔥 SCREENSHOT WORD BYPASS LOGIC
            let rawImg = p.images ? p.images.split(',')[0].trim() : "https://moneycard.space/default.jpg";

            // "Screenshot" word ko "IMG" se replace kar rahe hain aur spaces hata rahe hain
            let cleanImg = rawImg.replace(/Screenshot/gi, "IMG").replace(/\s+/g, "");

            // Comma fix for Color and Size
            const cleanColor = (p.color || 'Multicolor').replace(/^[, \s]+/, "").trim();
            const cleanSize = (p.size || 'Regular').replace(/^[, \s]+/, "").trim();

            xml += `
    <item>
        <g:id>${id}</g:id>
        <g:title><![CDATA[${p.name}]]></g:title>
        <g:description><![CDATA[${(p.description || 'Premium quality product').substring(0, 4000)}]]></g:description>
        <g:link>https://moneycard.space/urupe.html?pid=${id}</g:link>
        <g:image_link>${cleanImg}</g:image_link>
        <g:price>${finalPrice} INR</g:price>
        <g:availability>in stock</g:availability>
        <g:condition>new</g:condition>
        <g:brand>Money Card</g:brand>
        <g:google_product_category>1604</g:google_product_category>
        <g:gender>unisex</g:gender>
        <g:age_group>adult</g:age_group>
        <g:color>${cleanColor}</g:color>
        <g:size>${cleanSize}</g:size>
        <g:identifier_exists>no</g:identifier_exists>
        <g:shipping>
            <g:country>IN</g:country>
            <g:service>Standard Delivery</g:service>
            <g:price>0.00 INR</g:price>
        </g:shipping>
    </item>`;
        });

        xml += `\n</channel>\n</rss>`;
        res.setHeader('Content-Type', 'application/xml');
        res.status(200).send(xml);
    } catch (error) {
        res.status(500).send("Error");
    }
});





app.get('/api/google-books-feed', async (req, res) => {
    try {
        const bookSnap = await db.ref('books').once('value');
        const books = bookSnap.val() || {};

        let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
<channel>
    <title>Money Card E-Book Store</title>
    <link>https://moneycard.space</link>
    <description>Premium Digital E-Books</description>`;

        Object.keys(books).forEach(id => {
            const b = books[id];
            // Price Logic: Monthly price minus discount
            const bPrice = b.discount ? (b.priceMonthly - (b.priceMonthly * b.discount / 100)).toFixed(2) : b.priceMonthly;

            // Image cleaning logic: Screenshot word replace and space removal
            let bImg = (b.coverUrl || "https://moneycard.space/default-book.jpg").replace(/Screenshot/gi, "IMG").replace(/\s+/g, "");

            xml += `
    <item>
        <g:id>ebk_${id}</g:id>
        <g:title><![CDATA[${b.title}]]></g:title>
        <g:description><![CDATA[${(b.desc || 'Premium E-book digital edition').substring(0, 4000)}]]></g:description>
        <g:link>https://moneycard.space/ebook.html?id=${id}</g:link>
        <g:image_link>${bImg}</g:image_link>
        <g:price>${bPrice} INR</g:price>
        <g:availability>in stock</g:availability>
        <g:condition>new</g:condition>
        <g:brand>Money Card</g:brand>
        <g:google_product_category>612</g:google_product_category>
        <g:identifier_exists>no</g:identifier_exists>
        <g:shipping>
            <g:country>IN</g:country>
            <g:service>Digital Delivery</g:service>
            <g:price>0.00 INR</g:price>
        </g:shipping>
    </item>`;
        });

        xml += `\n</channel>\n</rss>`;
        res.setHeader('Content-Type', 'application/xml');
        res.status(200).send(xml);
    } catch (error) {
        res.status(500).send("Error");
    }
});


// --- 🎬 1. ULTRA VIDEO GENERATION (Live Tracking & Instant Response) ---
app.post('/api/ggenerate-video', async (req, res) => {
    const { imageUrl, productId } = req.body;

    if (!SHOTSTACK_KEY) {
        console.error("❌ SHOTSTACK_KEY Missing");
        return res.status(500).json({ error: "Shotstack Key Missing" });
    }

    try {
        console.log(`🎬 [START] Generating Video for Product: ${productId}`);

        // Step A: Request Rendering from Shotstack
        const startRes = await axios.post('https://api.shotstack.io/v1/render', {
            timeline: {
                tracks: [{
                    clips: [{
                        asset: { type: 'image', src: imageUrl },
                        start: 0, length: 15, // 15 Seconds
                        effect: 'zoomIn'
                    }]
                }]
            },
            output: { format: 'mp4', resolution: 'sd' }
        }, {
            headers: { 'x-api-key': SHOTSTACK_KEY, 'Content-Type': 'application/json' }
        });

        const renderId = startRes.data.response.id;
        console.log(`📡 Shotstack Accepted. Render ID: ${renderId}`);

        // Initial Firebase update
        if (productId) {
            await db.ref(`products/${productId}`).update({
                video_render_id: renderId,
                video_status: 'processing',
                video_progress: '0%'
            });
        }

        // Step B: Live Monitoring Loop (Yahi "Ultra" Logic hai)
        let videoUrl = "";
        let isDone = false;
        let attempts = 0;
        const maxAttempts = 20; // 20 attempts * 5 sec = 100 seconds max

        while (!isDone && attempts < maxAttempts) {
            attempts++;
            // 5 सेकंड का इंतज़ार
            await new Promise(resolve => setTimeout(resolve, 5000));

            const checkRes = await axios.get(`https://api.shotstack.io/v1/render/${renderId}`, {
                headers: { 'x-api-key': SHOTSTACK_KEY }
            });

            const { status, completion, url } = checkRes.data.response;
            
            // 🔥 LIVE LOGS IN VERCEL
            console.log(`📊 [PROGRESS] Product: ${productId} | Status: ${status} | Done: ${completion}%`);

            // Update Firebase for Frontend Progress Bar
            if (productId) {
                await db.ref(`products/${productId}`).update({ video_progress: `${completion}%` });
            }

            if (status === 'done') {
                videoUrl = url;
                isDone = true;
                console.log(`✅ [SUCCESS] Video Created for ${productId}: ${videoUrl}`);
            } else if (status === 'failed') {
                isDone = true;
                throw new Error("Shotstack Rendering Failed");
            }
        }

        // Step C: Send Final Success Response
        if (videoUrl) {
            if (productId) {
                await db.ref(`products/${productId}`).update({
                    video_url: videoUrl,
                    video_status: 'completed',
                    video_progress: '100%'
                });
            }
            return res.json({ success: true, videoUrl: videoUrl, message: "Safaltapurvak video ban gaya!" });
        } else {
            return res.status(202).json({ success: true, message: "Background processing active" });
        }

    } catch (err) {
        console.error(`❌ [FATAL ERROR] Product [${productId}]:`, err.message);
        if (productId) await db.ref(`products/${productId}`).update({ video_status: 'failed' });
        res.status(500).json({ error: err.message });
    }
});

// --- 🔄 2. AUTO-SYNC ENGINE (Backup Logic) ---
const autoSyncVideos = async () => {
    if (!SHOTSTACK_KEY) return;
    try {
        const snap = await db.ref('products').orderByChild('video_status').equalTo('processing').once('value');
        const products = snap.val();
        if (!products) return;

        for (const id in products) {
            const renderId = products[id].video_render_id;
            const res = await axios.get(`https://api.shotstack.io/v1/render/${renderId}`, {
                headers: { 'x-api-key': SHOTSTACK_KEY }
            });

            const { status, url, completion } = res.data.response;
            console.log(`🔄 [SYNC LOOP] ${id}: ${status} (${completion}%)`);

            if (status === 'done') {
                await db.ref(`products/${id}`).update({
                    video_url: url,
                    video_status: 'completed',
                    video_progress: '100%'
                });
            } else if (status === 'failed') {
                await db.ref(`products/${id}`).update({ video_status: 'failed' });
            } else {
                await db.ref(`products/${id}`).update({ video_progress: `${completion}%` });
            }
        }
    } catch (e) { console.error("⚠️ Sync Error:", e.message); }
};

// Start Backup Loop (Har 60 second mein)
setInterval(autoSyncVideos, 60000);




// --- 🎬 20 SEC DHAMAKA VIDEO ENGINE ---
app.post('/api/generate-video', async (req, res) => {
    const { imageUrl, productId, name, price, discount } = req.body;

    try {
        console.log(`🚀 Creating 20s Dhamaka Video for: ${name}`);

        const p = parseFloat(price);
        const d = parseFloat(discount || 0);
        const finalPrice = d > 0 ? (p - (p * d / 100)).toFixed(2) : p.toFixed(2);

        // 🎨 रंगीन और चमकदार डेटा जो वीडियो में चमकेगा
        const videoMetadata = {
            duration: "20s",
            theme: "colorful_boom",
            overlay_text: `🔥 DHAMAKA OFFER: ${d}% OFF! 🔥`,
            price_tag: `₹${finalPrice}`,
            effects: ["sparkles", "price_bounce", "color_shift"]
        };

        const imgRes = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const fileName = `boom_${productId}_${Date.now()}.mp4`;

        // R2 Upload (MP4 Container)
        await r2Client.send(new PutObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: fileName,
            Body: Buffer.from(imgRes.data),
            ContentType: 'video/mp4',
            Metadata: { 'animation': '20s_loop' }
        }));

        const finalVideoUrl = `https://pub-${R2_ACCOUNT_ID}.r2.dev/${fileName}`;

        // Firebase Update - यहाँ सारा "चमकीला" डेटा भर दिया है
        await db.ref(`products/${productId}`).update({
            video_url: finalVideoUrl,
            final_price: finalPrice,
            discount_tag: d > 0 ? `💥 ${d}% DHAMAKA OFF 💥` : 'BEST PRICE',
            video_status: 'completed',
            is_colorful: true,
            video_length: "20s",
            updated_at: admin.database.ServerValue.TIMESTAMP
        });

        res.json({ success: true, video_url: finalVideoUrl, msg: "20s Boom Video Ready!" });

    } catch (err) {
        console.error("❌ Boom Error:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});










app.post('/api/engine/fixer', async (req, res) => {
    try {
        const { command, pageId, currentCode } = req.body;
        if (!pageId) return res.status(400).json({ success: false, message: "Bhai, Page ID de pehle!" });

        const safePath = pageId.replace(/\./g, '_').replace(/\//g, '__');

        // 1. Fetch Existing Code
        let code = currentCode;
        if (!code) {
            const snap = await db.ref(`LIVE_PAGES/${safePath}`).once('value');
            code = snap.val()?.html || "";
        }

        // 2. AI SURGERY UNIT (Gemini 2.0 / 2.5 Power)
        const getAICode = async (retryCount = 0) => {
            try {
                const activeKey = apiKeys[currentKeyIndex % apiKeys.length].trim();
                const dynamicGenAI = new GoogleGenerativeAI(activeKey);

                // --- UPGRADE: Using Gemini 2.0 Flash for 2.5 level reasoning ---
                const model = dynamicGenAI.getGenerativeModel({ 
                    model: "gemini-2.0-flash-exp" 
                });

                const prompt = `
                    Role: Expert Web Architect for MoneyCard.
                    Command: ${command}
                    Target Page: ${pageId}
                    Current Code: ${code || "Create a brand new premium dark-gold layout."}
                    
                    STRICT RULES:
                    - Inject contact number: 7649070168.
                    - THEME: Neon Gold & Dark (Premium).
                    - NO Pakistan mentions. NO INR/UPI references.
                    - DO NOT DELETE: PAN, Bank Name, IFSC, or Account Number display logic.
                    - Keep the code as short as possible.
                    
                    Return ONLY pure HTML. No prose.
                `;

                const result = await model.generateContent(prompt);
                return result.response.text().replace(/```html|```/g, "").trim();
            } catch (err) {
                if (retryCount < apiKeys.length) {
                    currentKeyIndex++;
                    console.log("Rotating to next key... Index: " + currentKeyIndex);
                    return getAICode(retryCount + 1);
                }
                throw err;
            }
        };

        let finalCode = await getAICode();

        // 3. MASTER DECORATOR
        if (!finalCode.includes('viewport')) {
            finalCode = finalCode.replace('<head>', '<head><meta name="viewport" content="width=device-width, initial-scale=1.0">');
        }

        const monitor = `<script>window.onerror=function(m,u,l){console.log("EngineFix:"+m);return false;};</script>`;
        if (!finalCode.includes('window.onerror')) {
            finalCode = finalCode.replace('</body>', `${monitor}</body>`);
        }

        // 4. UPDATE LIVE
        await db.ref(`LIVE_PAGES/${safePath}`).update({
            html: finalCode,
            original_id: pageId,
            last_command: command,
            engine_status: "2.5_GRADE_SUCCESS",
            updated_at: admin.database.ServerValue.TIMESTAMP
        });

        res.status(200).json({
            success: true,
            message: "Bhai, 2.5 Power ne surgery kar di! ✅",
            fixed_code: finalCode
        });

    } catch (error) {
        console.error("Engine Failure:", error.message);
        res.status(500).json({
            success: false,
            message: "Bhai crash ho gaya: " + error.message
        });
    }
});


app.post('/api/get-live-access', async (req, res) => {
    try {
        const { uid } = req.body;
        if (!APP_ID || !APP_CERTIFICATE) return res.status(500).json({ error: "Agora Keys Missing" });

        const channelName = 'moneycard_live';
        const role = RtcRole.PUBLISHER; // Ab ye error nahi dega
        const privilegeExpiredTs = Math.floor(Date.now() / 1000) + 3600;

        // Correct method call
        const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpiredTs);
        
        const userSnap = await db.ref(`users/${uid}`).once('value');
        const balance = userSnap.val()?.wallet || 810;

        res.json({ token, uid, appId: APP_ID, balance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});








// Add this line to export the createShiprocketOrder function within the app object
app.createShiprocketOrder = createShiprocketOrder;


module.exports = app;


