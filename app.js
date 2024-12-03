const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();
const port = 3000;

// TEMPLATE ENGİNE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.get('/', ( req, res ) => {
    res.render('index');
});
app.post('/photos', ( req, res ) => {
    console.log(req.body);
    res.redirect('/');
});
app.listen(port, () => {
    console.log(`Sunucu port ${port}'de çalışmaktadır.`)
});