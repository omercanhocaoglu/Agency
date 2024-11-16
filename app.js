const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();
const port = 3000;

// TEMPLATE ENGİNE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));

// ROUTES
app.get('/', ( req, res ) => {
    // res.sendFile(path.resolve(__dirname, 'temp/index.ejs'));
    res.render('index');
});
app.listen(port, () => {
    console.log(`Sunucu port ${port}'de çalışmaktadır.`)
});