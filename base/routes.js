const express = require('express');
const router = express.Router();
const cors = require('cors');

const API_URL = 'http://localhost:4200';

const options = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: API_URL,
  preflightContinue: false
};

//use cors middleware
router.use(cors(options));

//add your routes

router.get('/', function (req, res) {
  res.send({'text':'Kangaroo home page'});
}) ;
//enable pre-flight
router.options("*", cors(options));



module.exports = router;