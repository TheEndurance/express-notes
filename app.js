const express = require('express');
const bodyParser = require('body-parser');
const notes = require('./routes/notes.js');

const app = express();

//middleawre
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());

//routes
app.use('/api',notes);


module.exports = app;