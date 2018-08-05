const express = require('express');
const bodyParser = require('body-parser');
const notes = require('./routes/notes.js');

const app = express();

app.use('/notes',notes);