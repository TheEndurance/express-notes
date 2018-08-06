const express = require('express');
const bodyParser = require('body-parser');
const notes = require('./routes/notes.js').router;

const app = express();

//middleawre
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json());

//routes
app.use('/api',notes);


module.exports = app;