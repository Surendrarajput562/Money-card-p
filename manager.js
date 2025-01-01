// **6. Manager Dashboard Route** (For the manager's dashboard)
app.get('/dashboard', (req, res) => {
  // Check if the user is authenticated (you can also check if the user is a manager here)
  const user = req.user; // Assume `req.user` is populated by a previous authentication middleware

  if (!user) {
    return res.status(401).send('Unauthorized: Please log in first.');
  }

  // Render or send a dashboard page or data
  res.send('Welcome to the Manager Dashboard');
});