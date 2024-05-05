const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
const cors = require("cors");

const app = express();
const port = 8888;

const url = "mongodb://localhost:27017"
const client = new MongoClient(url)
// Middleware to parse the form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


// Serve static files (your CSS file)
app.use(express.static('public'));

client.connect((err) => {
    if (err) {
      console.error("Error connecting to database", err);
    } else {
      console.log("Connected to MongoDB");
    }
  });

// Route to handle form submission
app.post('/submit-form', async (req, res) => {
    try {
        const data = req.body;
        const db = client.db("JobApp");
        const collection = db.collection("Common");
        const result = await collection.insertOne(data);
    
        if (result.acknowledged) {
          res.status(201).json({
            message: "form created successfully",
          });
        } else {
          console.error("Failed to insert form into the database");
          res.status(500).json({ error: "Failed to create form" });
        }
      } catch (err) {
        console.error("Error creating form:", err);
        res.status(500).json({ error: "Internal server error" });
      }
});

app.get('/get-all-data', async (req, res) => {
  try {
      const db = client.db("JobApp");
      const collection = db.collection("Common");
      const allData = await collection.find({}).toArray();

      res.status(200).json(allData);
  } catch (err) {
      console.error("Error retrieving data:", err);
      res.status(500).json({ error: "Internal server error" });
  }
});


app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/finalproj.html');
})

app.get('/login',(req,res)=>{
    res.sendFile(__dirname + '/public/finalogin.html');
})


app.get('/registerb',(req,res)=>{
    res.sendFile(__dirname + '/public/job.html');
})

app.get('/data',(req,res)=>{
  res.sendFile(__dirname + '/public/data.html');
})

app.get('/recruiter-data', (req, res) => {
  res.sendFile(__dirname + '/public/recruiter_data.html');
});





// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
