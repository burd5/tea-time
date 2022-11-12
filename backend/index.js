let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
const Teas = require('../backend/Models/Teas')

// Express Route

// Connecting mongoDB Database
const DB_STRING = 'mongodb+srv://teatime:earlgrey@cluster0.qnl5hfj.mongodb.net/?retryWrites=true&w=majority'
mongoose
  .connect(DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database")
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());



app.get('/teas', async (req,res) => {
  try {
    let teas = await Teas.find({})
    res.send(teas)
  } catch (error) {
    console.log(error)
  }
});

app.get('/formResponse', async (req,res) => {
  try {
    let type = req.query.type
    let region = req.query.region
    let flavor = req.query.flavor
    let caffeine = req.query.caffeine

    let types = await Teas.find({type: type})
    let regions = await Teas.find({region: region})
    let flavors = await Teas.find({flavor: flavor})
    let caffeines = await Teas.find({caffeine: caffeine})

    let search = await Teas.aggregate( [
      { $match: { $and: [ { type: type }, { region: region }, { flavor: flavor }, { caffeine: caffeine } ] } },
    ] )

   
    res.send(search)
  
  } catch (error) {
    console.log(error)
  }
});


// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});