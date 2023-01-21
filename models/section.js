const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
    'items': Array,
})

module.exports = mongoose.model('Section', sectionSchema)
