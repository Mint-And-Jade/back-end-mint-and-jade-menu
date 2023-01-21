const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

// use cors
app.use(cors())

// DB Connection
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://yorgo:8hZI1iJ28EzZF9fv@cluster0.fvt3o7d.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('DB Connected');
        app.listen('3000', () => {
            console.log('Server is on!');
        })
    }).catch((err) => {
        console.log(err);
    });


// Models
const Section = require('./models/section');
const Item = require('./models/item');
const Category = require('./models/category');

// API end-points
app.get('/', (req, res) => {
    res.send('Server Is On!')
})

app.post('/add-item', (req, res) => {
})

app.post('/add-category', (req, res) => {
})

app.post('/add-section', (req, res) => {
})

app.get('/get-sections', (req, res) => {
    res.send(Section.find())
})

app.delete('/delete-section', (req, res) => {
})

app.delete('/delete-item', (req, res) => {
})

app.delete('/delete-category', (req, res) => {
})



