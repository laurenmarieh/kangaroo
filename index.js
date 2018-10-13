// include modules
const express = require('express');
const app = express();
const path = require('path');
const routes = require('./base/routes.js');
const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var whitelist = ['http://localhost:4200']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// serve static content
app.use(express.static(path.join(__dirname, 'public')));
app.use('/hello', routes);
app.use(cors(corsOptions));

// Connection URL
const url = 'mongodb://bruce:password1@ds131313.mlab.com:31313/wallaby'
 
// Database Name
const dbName = 'wallaby';
 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    if(err){console.log(err)};
  assert.equal(null, err);
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);
 
  client.close();
});

// setup server
app.listen(7777);
console.log("Listening on port 7777");

