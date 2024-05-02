const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const dotenv = require("dotenv")
dotenv.config();
const mongoose = require("mongoose");
app.use(express.json())
const mailgun = require('mailgun-js')({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  });
//mongodb connection
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb+srv://oladimejiyomss:Oladimej1.@cluster0.smevodb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("connected to y-flex org database"))
  .catch((err) => console.log(err));
  // Define schema
const emailSchema = new mongoose.Schema({
    name: String,
    email: String, 
    phone: String, 
    subject: String
  });
  
  // Create model
  const Email = mongoose.model('Email', emailSchema);
// Define a route
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post('/sendEmails',async(req, res) => {
    try {
        const { name, email,phone,subject } = req?.body;
        const newEmail = new Email({ name, email,phone,subject  });
        await newEmail.save();
        res.status(201).json(newEmail);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
});
app.get('/getEmails',async(req, res) => {
    try {
        const emails = await Email.find();
        res.json(emails);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port${PORT}`);
});


