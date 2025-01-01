
const Razorpay = require('razorpay');
const crypto = require('crypto');
const express = require('express');
const admin = require('firebase-admin');
const QRCode = require('qrcode');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccountKey.json')),
  databaseURL: 'https://eighth-way-402410-default-rtdb.asia-southeast1.firebasedatabase.app',
});

const app = express();
app.use(express.json());
app.use(cors());

// **1. Root Route**
app.get('/', (req, res) => {
  res.send('Hello from Node.js with Firebase!');
});

// **2. Signup Route**
app.post('/signup', (req, res) => {
  const { email, password } = req.body;

  admin
    .auth()
    .createUser({ email, password })
    .then((userRecord) => {
      res.status(201).send(`User created with UID: ${userRecord.uid}`);
    })
    .catch((error) => {
      res.status(500).send(`Error creating user: ${error.message}`);
    });
});

// **3. Signin Route**
app.post('/signin', (req, res) => {
  const { email } = req.body;

  admin
    .auth()
    .getUserByEmail(email)
    .then((userRecord) => {
      res.status(200).send(`User signed in with UID: ${userRecord.uid}`);
    })
    .catch((error) => {
      res.status(500).send(`Error signing in user: ${error.message}`);
    });
});

// **4. Add User Data to Realtime Database**
app.post('/addUser', (req, res) => {
  const { username, email, name } = req.body;

  const ref = admin.database().ref('users');
  const newUserRef = ref.push();
  newUserRef
    .set({ username, email, name })
    .then(() => {
      res.status(200).send('User data added successfully');
    })
    .catch((error) => {
      res.status(500).send('Error adding user data: ' + error.message);
    });
});

// **5. Password Reset Route**
app.post('/resetPassword', (req, res) => {
  const { email } = req.body;

  admin
    .auth()
    .generatePasswordResetLink(email)
    .then((link) => {
      console.log('Password reset link:', link);
      res.status(200).send(`Password reset link sent to: ${email}`);
    })
    .catch((error) => {
      console.error('Error generating password reset link:', error);
      res.status(500).send(`Error generating password reset link: ${error.message}`);
    });
});

// **6. Loan Application Submission**
app.post('/apply-loan', (req, res) => {
  const { name, mobile, email, panCard, bankDetails } = req.body;

  const ref = admin.database().ref('loanApplications');
  const newLoanRef = ref.push();

  newLoanRef
    .set({
      name,
      mobile,
      email,
      panCard,
      bankDetails,
      status: 'Pending',
    })
    .then(() => {
      res.status(200).send('Loan application submitted successfully.');
    })
    .catch((error) => {
      res.status(500).send(`Error submitting loan application: ${error.message}`);
    });
});

// **7. Generate QR Code for UPI**
app.get('/generate-qr', async (req, res) => {
  const upiDetails = `upi://pay?pa=merchant@upi&pn=Merchant Name&am=1000&cu=INR`;

  try {
    const qrCodeUrl = await QRCode.toDataURL(upiDetails);
    res.status(200).send({ qrCodeUrl });
  } catch (error) {
    res.status(500).send('Failed to generate QR Code: ' + error.message);
  }
});

// **8. Token Verification**
app.post('/verifyToken', (req, res) => {
  const { idToken } = req.body;

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      res.status(200).send(`Token verified for user with UID: ${uid}`);
    })
    .catch((error) => {
      res.status(401).send('Invalid token: ' + error.message);
    });
});

// **9. Recharge Route**
app.post('/recharge', (req, res) => {
  const { mobileNumber, amount, rechargeType } = req.body;

  if (!mobileNumber || !amount || !rechargeType) {
    return res.status(400).send('Please fill all the fields.');
  }

  const ref = admin.database().ref('recharges');
  const newRechargeRef = ref.push();

  newRechargeRef
    .set({
      mobileNumber,
      amount,
      rechargeType,
      status: 'Pending',
      timestamp: Date.now(),
    })
    .then(() => {
      res.status(200).send('Recharge request successful.');
    })
    .catch((error) => {
      res.status(500).send('Error processing recharge request: ' + error.message);
    });
});

// **10. Credit Card Application**
app.post('/apply-credit-card', (req, res) => {
  const { fullName, email, mobileNumber, panNumber, income } = req.body;

  if (!fullName || !email || !mobileNumber || !panNumber || !income) {
    return res.status(400).send('All fields are required.');
  }

  const ref = admin.database().ref('creditCardApplications');
  const newApplicationRef = ref.push();

  newApplicationRef
    .set({
      fullName,
      email,
      mobileNumber,
      panNumber,
      income,
      status: 'Pending',
      date: new Date().toISOString(),
    })
    .then(() => {
      res.status(200).send('Credit card application submitted successfully.');
    })
    .catch((error) => {
      res.status(500).send('Error submitting application: ' + error.message);
    });
});


// Generate Unique Referral Code
function generateReferralCode(userId) {
    return userId.substring(0, 5).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
}

// Handle Signup with Referral Code
async function handleSignupWithReferral(userId, referralCode) {
    try {
        const usersRef = db.ref("users");
        const snapshot = await usersRef.once("value");

        let referrer = null;

        snapshot.forEach(user => {
            if (user.val().referralCode.toUpperCase() === referralCode.toUpperCase()) {
                referrer = user;
            }
        });

        if (referrer) {
            const referrerId = referrer.key;

            // Check referral limit
            const referralCount = Object.keys(referrer.val().referrals || {}).length;
            if (referralCount >= 10) {
                console.log("Referral limit exceeded!");
                return;
            }

            // Add referral and update rewards
            await usersRef.child(`${referrerId}/referrals`).push(userId);

            await usersRef.child(`${referrerId}/rewards`).transaction(currentRewards => {
                if ((currentRewards || 0) + 50 <= 5000) {
                    return (currentRewards || 0) + 50;
                }
                return currentRewards; // No change if limit exceeded
            });

            // Add new user entry
            await usersRef.child(userId).set({
                referralCode: generateReferralCode(userId),
                referredBy: referrerId,
                rewards: 0,
                referrals: []
            });

            console.log("Referral processed successfully!");
        } else {
            console.log("Invalid referral code!");
        }
    } catch (error) {
        console.error("Error during referral processing:", error.message);
    }
}

// Reward Distribution (Extra Function)
async function distributeReward(userId, referrerId) {
    try {
        const referrerRef = db.ref(`users/${referrerId}`);
        const referrerSnapshot = await referrerRef.once("value");

        if (referrerSnapshot.exists()) {
            const referrerData = referrerSnapshot.val();

            // Check monthly reward limit
            if ((referrerData.rewards || 0) + 50 <= 5000) {
                await referrerRef.child("rewards").transaction(currentRewards => {
                    return (currentRewards || 0) + 50;
                });
                console.log("Reward credited to referrer!");
            } else {
                console.log("Monthly reward limit exceeded!");
            }
        }
    } catch (error) {
        console.error("Error during reward distribution:", error.message);
    }
}




// Razorpay Initialization
const razorpay = new Razorpay({
  key_id: "rzp_live_eGGQDN62teIXQZ",
  key_secret: "LEPmFHMmkOQAaKdtQhubngVw",
});

// API Routes

// Verify Token
app.post('/verifyToken', (req, res) => {
  const idToken = req.body.idToken;
  admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => res.status(200).json({ uid: decodedToken.uid }))
    .catch((error) => res.status(401).json({ error: "Invalid token" }));
});

// Recharge
app.post('/recharge', (req, res) => {
  const { mobileNumber, amount, rechargeType } = req.body;

  const rechargeRef = admin.database().ref("recharges");
  rechargeRef.push({ mobileNumber, amount, rechargeType, date: new Date().toISOString() })
    .then(() => res.status(200).json({ message: "Recharge successful" }))
    .catch((error) => res.status(500).json({ error: "Recharge failed" }));
});

// Create Razorpay Order
app.post('/createOrder', async (req, res) => {
  const { amount } = req.body;
  const options = { amount: amount * 100, currency: "INR", receipt: `receipt_${Date.now()}` };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json({ orderId: order.id, amount: order.amount / 100 });
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
});

// Verify Razorpay Payment
app.post('/verifyPayment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generatedSignature = crypto.createHmac("sha256", "LEPmFHMmkOQAaKdtQhubngVw")
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature === razorpay_signature) {
    res.status(200).json({ message: "Payment verified successfully" });
  } else {
    res.status(400).json({ error: "Invalid payment signature" });
  }
});

// Loan API
const loanRequestsRef = admin.database().ref("loanRequests");

app.post('/apply-loan', (req, res) => {
  const { name, mobile, email, pan, bankDetails } = req.body;
  loanRequestsRef.push({ name, mobile, email, pan, bankDetails, status: "pending" })
    .then(() => res.status(200).json({ message: "Loan application submitted" }))
    .catch((error) => res.status(500).json({ error: "Failed to submit loan application" }));
});



const path = require('path'); // path मॉड्यूल को इम्पोर्ट करें



// Static files (HTML फाइल को सर्व करना)
app.use(express.static(path.join(__dirname, 'public'))); // 'public' को सही से लिखें

// Default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/helpandsupport.html')); // फाइल का सही पाथ दें
});

 
// Static फाइल्स को serve करने के लिए public फोल्डर का उपयोग करें
app.use(express.static(path.join(__dirname, "../public")));

// Default Route (Home Page)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});



  

// Define a port using environment variable or fallback to 3000
const PORT = process.env.PORT || 3000;

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello, your app is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 











