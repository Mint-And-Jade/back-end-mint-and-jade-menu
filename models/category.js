const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    'section_id': String,
    'name': String,
    'note': String
})

module.exports = mongoose.model('Category', categorySchema)
