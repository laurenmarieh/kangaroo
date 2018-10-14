const express = require('express');
const router = express.Router();
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var db; 

const UI_URL = 'http://localhost:4200';

const options = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: UI_URL,
  preflightContinue: false
};


// Connection URL
const url = 'mongodb://bruce:password1@ds131313.mlab.com:31313/wallaby'
 
// Database Name
const dbName = 'wallaby';
 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    if(err){console.log(err)};
  assert.equal(null, err);
  console.log("Connected successfully to server");
 
  db = client.db(dbName);
 });

//use cors middleware
router.use(cors(options));

//add your routes

router.get('/', function (req, res) {
  res.send({'text':'Kangaroo home page'});
});

router.post('/addExperience', (req, res) => {
  // Insert JSON straight into MongoDB
  db.collection('experiences').insertOne(req.body, function (err, result) {
      if (err)
          throw err;
      else
        res.send('Success!!');
  });
});

router.get('/getExperiences', (req, res) => {
  db.collection("experiences").find({}).toArray(function(err, result) {
    if (err)
     throw err;
     res.send(result);
    });
});

router.post('/addStory', (req, res) => {
  // Insert JSON straight into MongoDB
  db.collection('stories').insertOne(req.body, function (err, result) {
      if (err)
          throw err;
      else
        res.send('Success!!');
  });
});

router.get('/getStories', (req, res) => {
  db.collection("stories").find({}).toArray(function(err, result) {
    if (err)
     throw err;
     res.send(result);
    });
});

router.post('/login', (req, res) => {
  db.collection("users").find({'email' : req.body.email}).toArray(function(err, result) {
    let loginResult = {token: '', error: ''};
    if (err){
      throw err;
      
      res.send(loginResult);
    }
    else{
      if (result.length === 0) {
        loginResult.error = "Your username or password is incorrect. Please try again or register an account";
        res.send(loginResult);
      }
      else{
        loginResult.token = result[0]._id;
        res.send(loginResult);
      }
    };
  });
});

router.post('/getUser', (req, res) => {
  console.log(req.body);
  db.collection("users").find({'_id' : new ObjectId(req.body.id)}).toArray(function(err, result) {
    console.log(result);
    if (err){
      throw err;
    }
    res.send(result); 
  });
});

router.post('/register', (req, res) => {
  // Insert JSON straight into MongoDB
  db.collection('users').insertOne(req.body, function (err, result) {
      if (err)
          throw err;
      else
        res.send('Success!!');
  });
});

//enable pre-flight
router.options("*", cors(options));

module.exports = router;