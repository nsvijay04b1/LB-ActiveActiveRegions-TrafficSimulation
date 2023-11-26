const express = require('express');
const app = express();
const port = 9999;

// Enable CORS for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Your route handling
app.get('/random-status', (req, res) => {
    // Your logic to randomly return 200 or 500
    const statusCode = Math.random() < 0.5 ? 200 : 500;
    res.status(statusCode).send(`Status Code: ${statusCode}`);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
