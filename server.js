const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const app = express()

// use body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

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
const Item = require('./models/item');
const Category = require('./models/category');
const Section = require('./models/section');



// API end-points
app.get('/', (req, res) => {
    res.send('Server Is On!')
})

app.post('/add-item', (req, res) => {
    Item.create({
        name: req.body.name,
        price: req.body.price
    })
})

app.post('/add-category', (req, res) => {
})

app.post('/add-section', (req, res) => {
    console.log(req.body);
    // Section.create({
    //     categories: req.body.categories,
    //     name: req.body.name
    // })
})

app.get('/get-sections', (req, res) => {
    res.json(Section.find())
})

app.delete('/delete-section', (req, res) => {
})

app.delete('/delete-item', (req, res) => {
})

app.delete('/delete-category', (req, res) => {
})



