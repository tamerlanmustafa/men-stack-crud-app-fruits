const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// APP CONFIGURATION
const app = express()
dotenv.config()

const methodOverride = require('method-override')
const morgan = require('morgan')


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

app.use(methodOverride('_method'))
app.use(morgan('dev'))




app.use(express.urlencoded({ extended: false }));

// ROUTES

app.get("/", (req, res) => {
    res.render('index') 
});
  

app.get('/fruits/new',  (req, res) => {
    res.render('fruits/new') 
})

app.get('/fruits', async (req, res) => {
    try {
        const allFruits = await Fruit.find()
        res.render('fruits/index', { fruits: allFruits })
    } catch (err) {
        console.log(err) 
        res.redirect('/')
    }
})

app.get('/fruits/:id', async (req, res) => {
    
    try {
        const singleFruit = await Fruit.findById(req.params.id)
        res.render('fruits/show', { singleFruit })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }


})

app.post('/fruits', async (req, res) => {
    
    if (req.body.isReadyToEat) {
        req.body.isReadyToEat = true
    } else {
        req.body.isReadyToEat =  false
    }
    
    res.send(req.body)
    console.log(req.body)

    try {
        await Fruit.create(req.body)
        res.redirect('/fruits/new?status=success')
    } catch (err) {
        res.status(400).json({error: err.message}) 
    }
})


app.listen(PORT, console.log(`running on ${PORT}`))