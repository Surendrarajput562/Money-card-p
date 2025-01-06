
// Import Firebase and required services
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

// Firebase configuration 
const firebaseConfig = {
  apiKey: "AIzaSyADDJ1cCxrwRIMH4hi7-YdcTRY_71fr2C0",
  authDomain: "eighth-way-402410.web.app",
  databaseURL: "https://eighth-way-402410-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "eighth-way-402410",
  storageBucket: "eighth-way-402410.firebasestorage.app",
  messagingSenderId: "595819547411",
  appId: "1:595819547411:web:be98f1880df09ce6fa28e6",
  measurementId: "G-B5H7TQBVVV"
};
      

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


// Google Sign-In/Sign-Up
document.getElementById('signInButton').addEventListener('click', () => {
  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      user.getIdToken().then((idToken) => {
        // Send token to backend (optional for server verification)
        fetch('/verifyToken', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("Error:", error));

        // After successful sign-in or sign-up, check for owner
        checkUserRole(user);
      });
    })
    .catch((error) => {
      console.error("Error signing in with Google:", error);
    });
});

// Check user role (owner or customer)
function checkUserRole(user) {
  const userRef = firebase.database().ref('users/' + user.uid);
  userRef.once('value', (snapshot) => {
    const userData = snapshot.val();
    if (userData && userData.role === 'owner') {
      loadPage('ownerDashboard'); // Load owner dashboard page
    } else {
      loadPage('homepage'); // Load homepage for normal users
    }
  });
}

// Load page dynamically (SPA navigation)
function loadPage(page) {
  history.pushState(null, null, `#${page}`);
  switch (page) {
    case 'ownerDashboard':
      loadOwnerDashboard();
      break;
    case 'homepage':
      loadHomepage();
      break;
    default:
      loadHomepage();
  }
}

// Load homepage content
function loadHomepage() {
  const appContent = document.getElementById('app-content');
  appContent.innerHTML = `
    <h1>Welcome to the Homepage</h1>
    <!-- Add other homepage content here -->
  `;
}

// Load owner dashboard content
function loadOwnerDashboard() {
  const appContent = document.getElementById('app-content');
  appContent.innerHTML = `
    <h1>Owner Dashboard</h1>
    <!-- Add owner dashboard content here -->
  `;
}

// Sign In with Email and Password
document.getElementById('signInEmailButton').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      checkUserRole(user);
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
});

// Sign Up with Email and Password
document.getElementById('signUpButton').addEventListener('click', () => {
  const newEmail = document.getElementById('newEmail').value;
  const newPassword = document.getElementById('newPassword').value;
  
  auth.createUserWithEmailAndPassword(newEmail, newPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      const userRef = firebase.database().ref('users/' + user.uid);
      userRef.set({
        email: newEmail,
        role: 'customer'  // Default role is customer
      });
      loadPage('homepage');
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
});

// Initialize page load based on URL hash
window.onload = function() {
  const page = window.location.hash.substring(1);
  loadPage(page || 'homepage');
};

// Function to toggle theme (optional)
function toggleTheme() {
  document.body.classList.toggle('dark-theme');
}

// Recharge form submission handling
document.getElementById('rechargeForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const mobileNumber = document.getElementById('mobileNumber').value;
  const amount = document.getElementById('amount').value;
  const rechargeType = document.getElementById('rechargeType').value;

  if (!mobileNumber || !amount) {
    alert("Please fill all fields.");
    return;
  }

  fetch('/recharge', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobileNumber, amount, rechargeType }),
  })
  .then(response => response.json())
  .then(data => alert(`Recharge successful: ${JSON.stringify(data)}`))
  .catch(error => console.error("Error:", error));
});

// Fetch products from Firebase and display them
async function fetchProducts() {
  const productsRef = firebase.database().ref("products");
  const snapshot = await productsRef.once("value");
  const products = snapshot.val();

  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = ""; 

  for (let key in products) {
    const product = products[key];
    productsContainer.innerHTML += `
      <div class="product">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="openPaymentModal('${key}')">Buy Now</button>
      </div>
    `;
  }
}

window.onload = fetchProducts;

// Payment modal handling
function openPaymentModal(productId) {
  const modal = document.getElementById("paymentModal");
  modal.style.display = "block";
  modal.setAttribute("data-product-id", productId);
}

function closeModal() {
  document.getElementById("paymentModal").style.display = "none";
}

function processPayment(method) {
  const modal = document.getElementById("paymentModal");
  const productId = modal.getAttribute("data-product-id");

  if (method === "online") {
    alert("Redirecting to online payment gateway...");
  } else {
    alert("Order placed! Pay on delivery.");
  }

  closeModal();
}

// Credit Card form submission handling
document.getElementById("creditCardForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Collect user details
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const mobileNumber = document.getElementById("mobileNumber").value;
  const panNumber = document.getElementById("panNumber").value;
  const income = document.getElementById("income").value;

  // Simulate API request response
  const response = { success: true, message: "Application submitted successfully!" };

  // Update response message
  document.getElementById("responseMessage").textContent = response.message;

  // Send user details to the owner page
  localStorage.setItem("userDetails", JSON.stringify({
    fullName,
    email,
    mobileNumber,
    panNumber,
    income
  }));

  // Show hidden buttons after form submission
  const hiddenButtons = document.querySelectorAll('.hidden-btn');
  hiddenButtons.forEach((btn, index) => {
    setTimeout(() => {
      btn.style.display = 'block';
    }, index * 500); // Delay each button's appearance
  });
});

// Submit Details button action
document.getElementById("submitDetailsBtn").addEventListener("click", function () {
  window.location.href = "owner.html";  // Redirect to owner.html to view the user details
});

// Apply button action
document.getElementById("applyBtn").addEventListener("click", function () {
  const redirectUrl = "https://www.google.com";  // Replace with the actual redirect URL
  window.location.href = redirectUrl;  // Redirect to the URL
});

// Common booking function
const bookService = (req, res, serviceName) => {
  const { company, details } = req.body;

  if (!company || !details) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  // Save data to respective service node in Realtime Database
  db.ref(`${serviceName}`).push({ company, details })
    .then(() => {
      res.status(200).send({ message: `${serviceName} booking saved successfully.` });
    })
    .catch(error => {
      res.status(500).send({ error: `Failed to save ${serviceName} booking: ${error.message}` });
    });
};

// Flight booking endpoint
app.post("/book-flight", (req, res) => {
  bookService(req, res, "flights");
});

// Train booking endpoint
app.post("/book-train", (req, res) => {
  bookService(req, res, "trains");
});

// Bus booking endpoint
app.post("/book-bus", (req, res) => {
  bookService(req, res, "buses");
});

// Razorpay Payment Process (Create Order)
app.post("/create-order", async (req, res) => {
  const { amount, scanUPI, serviceChargeUPI } = req.body;

  try {
    const serviceCharge = amount * 0.03;  // Calculate 3% service charge
    const finalAmount = amount - serviceCharge;

    const options = {
      amount: amount * 100,  // Convert to paise
      currency: "INR",  // Currency type
      receipt: "order_rcptid_11",  // Unique receipt ID
    };
    const order = await razorpay.orders.create(options);  // Razorpay order creation

    // Send order details as response
    res.status(200).json({
      success: true,
      orderId: order.id,  // Order ID from Razorpay
      amount,
      serviceCharge,
      finalAmount,
      scanUPI,
      serviceChargeUPI,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, error: "Failed to create order" });
  }
});

// Verify Payment
app.post("/verify-payment", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  try {
    const crypto = require("crypto");
    const generatedSignature = crypto
      .createHmac("sha256", "LEPmFHMmkOQAaKdtQhubngVw")  // Replace with your Razorpay Secret
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, error: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Payment Transfer
app.post("/transfer-payment", async (req, res) => {
  const { amount, serviceCharge, scanUPI, serviceChargeUPI } = req.body;

  try {
    // Simulate successful transfer for now
    res.status(200).json({
      success: true,
      message: "Payment transferred successfully",
      details: {
        serviceChargeTransferredTo: serviceChargeUPI,
        remainingTransferredTo: scanUPI,
      },
    });
  } catch (error) {
    console.error("Error transferring payment:", error);
    res.status(500).json({ success: false, error: "Failed to transfer payment" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
	
