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


const Fruit = require('./models/fruit')

app.set('view engine', 'ejs')
// MIDDLEWARE





app.use(express.urlencoded({ extended: false }));

// ROUTES

app.get("/", (req, res) => {
    res.render('index')
});
  

app.get('/fruits/new',  (req, res) => {
    res.render('fruits/new.ejs')
})

app.post('/fruits', async (req, res) => {
    
    if (req.body.isReadyToEat) {
        req.body.isReadyToEat = true
    } else {
        req.body.isReadyToEat = false
    }
    
    res.send(req.body)
    console.log(req.body)

    try {
        const createFruit = await Fruit.create(req.body)
        res.redirect('/fruits/new')
    } catch (err) {
        res.status(400).json({error: err.message})
        console.log(err)
    }
})


app.listen(PORT, console.log(`running on ${PORT}`))