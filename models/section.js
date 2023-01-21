const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
    'categories': Array,
    'name': String
})

module.exports = mongoose.model('Section', sectionSchema)
