
// Firebase configuration 
const firebaseConfig = {
  apiKey: "AIzaSyADDJ1cCxrwRIMH4hi7-YdcTRY_71fr2C0",
  authDomain: "eighth-way-402410.web.app",
  databaseURL: "https://eighth-way-402410-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "eighth-way-402410",
  storageBucket: "eighth-way-402410.firebasestorage.app",
  messagingSenderId: "595819547411",
  appId: "1:595819547411:web:be98f1880df09ce6fa28e6",
  measurementId: "G-B5H7TQBVYV"
};




// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

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

        // After successful sign-in or sign-up, redirect to home.html
        window.location.href = 'homepage.html';
      });
    })
    .catch((error) => {
      console.error("Error signing in with Google:", error);
    });
});

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

// Fetch tickets (example endpoint)
fetch('/tickets')
  .then((response) => response.json())
  .then((data) => console.log("Tickets:", data))
  .catch((err) => console.error("Error fetching tickets:", err));

// Avoid duplicate server instances (Node.js backend)
const PORT = process.env.PORT || 4000;  // 3000 से 4000 बदल दिया है
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
