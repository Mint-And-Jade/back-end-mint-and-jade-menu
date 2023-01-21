const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    'items': Array,
    'name': String,
    'note': String
})

module.exports = mongoose.model('Category', categorySchema)
