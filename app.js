const express = require("express");

const app = express();
const port = 3000;

app.get('/', ( req, res ) => {
    res.send('Merhabaaaa!');
});
app.listen(port, () => {
    console.log(`Sunucu port ${port}'de çalışmaktadır.`)
});