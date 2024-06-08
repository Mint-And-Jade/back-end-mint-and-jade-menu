const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const app = express()

// use body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use cors
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    origin: '*'
}))

// DB Connection
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://yorgo:8hZI1iJ28EzZF9fv@cluster0.fvt3o7d.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('DB Connected');
        app.listen('10000', () => {
            console.log('Server is on!');
        })
    }).catch((err) => {
        console.log(err);
    });


// Models
const Item = require('./models/item');
const Category = require('./models/category');
const Section = require('./models/section');


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://mintandjade.netlify.app"); // Update to match the requesting origin
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


// API end-points
app.get('/', (req, res) => {
    res.send('Server Is On!')
})

// Add
app.post('/add-item', (req, res) => {
    Item.create({
        name: req.body.name,
        price: req.body.price,
        category_id: req.body.category_id,
    }, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result)
        }
    })
})

app.post('/add-category', (req, res) => {
    Category.create({
        name: req.body.name,
        section_id: req.body.section_id,
        note: req.body.note
    }, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result)
        }
    })
})

app.post('/add-section', (req, res) => {
    Section.create({
        name: req.body.name
    }, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result)
        }
    })
})

// Get
app.get('/get-sections', (req, res) => {
    Section.find({}, function (err, sections) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(sections)
        }
    });
})

app.get('/get-categories', (req, res) => {
    Category.find({}, function (err, categories) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(categories)
        }
    });
})

app.get('/get-items', (req, res) => {
    Item.find({}, function (err, items) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(items)
        }
    });
})

app.get('/get-all-page-data', (req, res) => {
    Promise.all([
        Section.find({}),
        Category.find({}),
        Item.find({})
    ])
    .then(results => {
        res.json(results)
    })
})

// Edit 
app.put('/edit-sections', (req, res) => {
    for (let i = 0; i < req.body.editedSections.length; i++) {
        const section = req.body.editedSections[i];
        Section.findByIdAndUpdate(section._id, {
            name: section.name,
        }, {
            new: true
        }, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(result)
            }
        })
    }
})

app.put('/edit-categories', (req, res) => {
    for (let i = 0; i < req.body.editedCategory.length; i++) {
        const category = req.body.editedCategory[i];
        Category.findByIdAndUpdate(category._id, {
            name: category.name,
            note: category.note
        }, {
            new: true
        }, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(result)
            }
        })
    }
})

app.put('/edit-items', (req, res) => {
    console.log(req.body.editedItems);
    for (let i = 0; i < req.body.editedItems.length; i++) {
        const item = req.body.editedItems[i];
        Item.findByIdAndUpdate(item._id, {
            name: item.name,
            price: item.price
        }, {
            new: true
        }, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(result)
            }
        })
    }
})

// Delete
app.delete('/delete-section', (req, res) => {
    Section.findByIdAndDelete(req.body.section_id, (err, doc) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(doc)
        }
    })
})

app.delete('/delete-item', (req, res) => {
    Item.findByIdAndDelete(req.body.item_id, (err, doc) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(doc)
        }
    })
})

app.delete('/delete-category', (req, res) => {
    Category.findByIdAndDelete(req.body.category_id, (err, doc) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(doc)
        }
    })
})
