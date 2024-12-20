const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const fs = require('fs');

const Photo = require('./models/Photo');

const app = express();
const port = 3000;

// connect DB
mongoose.connect('mongodb://localhost/agency-test-db',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// TEMPLATE ENGİNE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

// ROUTES
app.get('/', async ( req, res ) => {
    const photos = await Photo.find({}).sort('-dateCreated');
    res.render('index', {
        photos
    });
});
app.get('/photos/:id', async (req, res) => {
    // console.log(req.params.id);
    // res.render();
    const photo = await Photo.findById(req.params.id);
    res.render('photo', {
        photo
    }); 
});
app.post('/photos', async ( req, res ) => {
    //console.log(req.files.image);
    // console.log(req.body);
    //await Photo.create(req.body);
    //res.redirect('/');
    
    const uploadDir = 'public/uploads';
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    };  
    let uploadedImage = req.files.image;
    let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name;
    uploadedImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadedImage.name
        });
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`Sunucu port ${port}'de çalışmaktadır.`)
});