// include modules
const express = require('express');
const app = express();
const path = require('path');
const routes = require('./base/routes.js');
const cors = require('cors');
const bodyParser = require('body-parser');




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
app.use(bodyParser.json());
app.use('/service', routes);
app.use(cors(corsOptions));



// setup server
app.listen(7777);
console.log("Listening on port 7777");

