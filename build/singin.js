app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  admin
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Successfully signed in
      const user = userCredential.user;

      // Generate a token for the user
      user.getIdToken().then((idToken) => {
        res.status(200).send({ message: 'User signed in successfully', token: idToken });
        // You can also send the token to the front-end to manage the session
      });
    })
    .catch((error) => {
      res.status(500).send(`Error signing in user: ${error.message}`);
    });
});