// include modules
var express = require('express');
var app = express();
var path = require('path');

// serve static content
app.use(express.static(path.join(__dirname, 'public')));

// setup server
app.listen(7777);
console.log("Listening on port 7777");