const mongoose = require('mongoose')






const fruitSchema = new mongoose.Schema({
    name: String,
    isReadyToEat: Boolean,
    color: { type: String, required: true, default: 'Green' }
})

const Fruit = mongoose.model('Fruit', fruitSchema)


module.exports = Fruit  