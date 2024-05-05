const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

// Middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like your HTML, CSS, and images)
app.use(express.static('public'));

// Handle form submission
app.post('/submit-form', (req, res) => {
    const formData = req.body;
    console.log('Form Data:', formData);

    // You can add additional processing here if needed

    res.send('Form submitted successfully!');
});

app.get('/form',(req,res)=>{
    res.sendFile(__dirname + '/public/finalproj.html');
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
