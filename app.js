const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');

//controllers
const PhotoControllers = require('./controllers/PhotoControllers');

// port and express
const app = express();
const port = process.env.PORT || 5000;

// connect DB
mongoose.connect('mongodb+srv://omercanhocaoglu:pw2w0HooJhQk3ZkY@cluster0.zm3je.mongodb.net/',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then( () => {
    console.log('DB connected!')
} ).catch((err) => {
    console.log(err)
});

// TEMPLATE ENGİNE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}));

// ROUTES
app.get('/', PhotoControllers.getAllPhotos );
app.get('/photos/:id', PhotoControllers.getSinglePhoto );
app.get('/photos/edit/:id',PhotoControllers.getEditPhoto );
// POST
app.post('/photos', PhotoControllers.getUploadPhoto );
// EDIT
app.put('/photos/:id', PhotoControllers.getEditedPhoto);
// DELETE
app.delete('/photos/:id', PhotoControllers.getDeletePhoto );

app.listen(port, () => {
    console.log(`Sunucu port ${port}'de çalışmaktadır.`)
});