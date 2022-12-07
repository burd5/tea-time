  let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();
  let Teas = require('../Models/Teas')

router.route('/teas').get((req, res) => {
  try {
    let teas = Teas.find({})
    res.send(teas)
  } catch (error) {
    console.log(error)
  }});

