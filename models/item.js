const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    'category_id': String,
    'name': String,
    'price': Number,
})

module.exports = mongoose.model('Item', itemSchema)
