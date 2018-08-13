const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs-extra');
const usersRouter = require('./routes/users.js').router;

// Create the app server
var app = express();

// For each request, provide wildcard Access-Control-* headers via OPTIONS call
app.use(cors()); 

app.use(bodyParser.urlencoded({
    extended:false
}));
// For each request, parse request body into a JavaScript object where header Content-Type is application/json
app.use(bodyParser.json());


app.use('/auth',usersRouter);
// app.get('/login', (req, res) => {

  
app.listen(process.env.PORT || 3003);