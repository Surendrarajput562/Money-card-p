// Middleware to verify token and set user in request
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send('Token is required');
  }

  admin.auth().verifyIdToken(token)
    .then(decodedToken => {
      req.user = decodedToken;  // Attach user information to request
      next();
    })
    .catch((error) => {
      console.error('Error verifying token:', error);
      res.status(401).send('Unauthorized');
    });
};

// Apply the middleware for routes that require authentication
app.use('/dashboard', verifyToken);