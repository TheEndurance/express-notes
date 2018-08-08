const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs-extra');
  
// We pass a secret token into the NodeJS process via an environment variable.
// We will use this token to sign cookies and JWTs

// Create the app server
var app = express();

// For each request, provide wildcard Access-Control-* headers via OPTIONS call
app.use(cors()); 

app.use(bodyParser.urlencoded({
    extended:false
}));
// For each request, parse request body into a JavaScript object where header Content-Type is application/json
app.use(bodyParser.json());

app.get('/login', (req, res) => {

  
  // Some how get the user.  
  // This doesn't have to be sync... you could write the token gen and response in a callback  
  var user = { _id:"test", email:"test@email.com"};
  
  // https://github.com/auth0/node-jsonwebtoken
  // Using SECRET_TOKEN, create a token string that contains the user's _id from the database.

  const privateKey = fs.readFileSync('jwtRS256.key');
  const publicKey = fs.readFileSync('jwtRS256.key.pub');

  let token = jwt.sign(user,privateKey,{algorithm:'RS256'});

  let decodedToken = jwt.verify(token,publicKey,{algorithms: ['RS256']});


  // Send the response with 200 status code (ok) and the user object + the token
  // The client will send the token with every future request
  // against secured API endpoints.
  res.status(200).send({
    token: token,
    decodedToken: decodedToken
  });
});


app.listen(3003); // Listen on port 80