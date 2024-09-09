const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// APP CONFIGURATION
const app = express()
dotenv.config()


const PORT = process.env.PORT || 3000




mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
  

mongoose.connection.on("error", (err) => {
    console.log(err)
});
  


app.set('view engine', 'ejs')
// MIDDLEWARE





// ROUTES

app.get("/", (req, res) => {
    res.render('index')
  });

app.listen(PORT, console.log(`running on ${PORT}`))