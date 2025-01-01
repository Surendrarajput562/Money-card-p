const express = require("express");
const router = express.Router(); // Ensure router instance is unique
const admin = require("firebase-admin");

// Ensure Firebase Admin SDK is already initialized
const db = admin.database();
const loanRequestsRef = db.ref("loanRequests");

// Route to fetch loan data
router.get("/loan-data", async (req, res) => {
  try {
    const snapshot = await loanRequestsRef.once("value");
    res.status(200).json(snapshot.val());
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch loan data" });
  }
});

// Route to approve/reject loan
router.post("/update-loan-status", async (req, res) => {
  const { loanId, status } = req.body;

  try {
    await loanRequestsRef.child(loanId).update({ status });
    res.status(200).json({ message: "Loan status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update loan status" });
  }
});

module.exports = router;



const productsRef = db.ref('products');

// Get all products
router.get('/products', async (req, res) => {
  try {
    const snapshot = await productsRef.once('value');
    res.status(200).json(snapshot.val());
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Add a new product
router.post('/add-product', async (req, res) => {
  const product = req.body;

  if (!product.name || !product.description || !product.price || !product.imageUrl) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newProductRef = productsRef.push();
    await newProductRef.set(product);
    res.status(200).json({ message: 'Product added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Delete a product
router.delete('/delete-product/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await productsRef.child(id).remove();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;