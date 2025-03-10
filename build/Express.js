const express = require('express');
const app = express();

// Static files serve करने के लिए
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Main HTML File
});

const PORT = process.env.PORT || 4000;  // 3000 से 4000 बदल दिया है
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
