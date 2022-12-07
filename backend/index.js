let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
const Teas = require('../backend/Models/Teas');
const { validateYupSchema } = require('formik');


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
app.use(cors())

app.get('/collection', async (req, res) => {
  try {
    let teas = await Teas.find({})
    res.send(teas)
  } catch (error) {
    console.log(error)
  }});


app.get('/teas', async (req,res) => {
  try {

    let teaType = req.query.type
    let teaFlavor = req.query.flavor
    let teaRegion = req.query.region
    let teaCaffeine = req.query.caffeine
    
    let type = await Teas.find({type: teaType})
    let regions = await Teas.find({region: teaRegion})
    let flavors = await Teas.find({flavor: teaFlavor})
    let caffeines = await Teas.find({caffeine: teaCaffeine})
    

    let search = await Teas.aggregate( [
      { $match: { $and: [ { type: teaType }, { region: teaRegion }, { flavor: teaFlavor }, { caffeine: teaCaffeine} ] } },
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