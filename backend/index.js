let express = require('express');
let mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan')
const validator = require('validator')
const passport = require('passport');
const passportLocal = require("passport-local").Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session')
let bodyParser = require('body-parser');
const Teas = require('./Models/Teas');
const User = require('./Models/User');
const { response } = require('express');
const ObjectId = require('mongodb').ObjectId;

require('dotenv').config({path: './config/.env'})

const app = express();


require('./config/passport')(passport);

// Middleware
app.use(session({
  secret: 'earlgrey',
  saveUninitialized: true,
  resave: true,
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  resave: false,
  saveUninitialized: false,
  cookie:{ secure :false}
}))

app.use(cookieParser('earlgrey'));

require('dotenv').config({path: './config/.env'})


/////////////////////////////////



// Connecting mongoDB Database

mongoose
  .connect(process.env.DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database")
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })

app.use(express.json())
app.use(logger('dev'))
app.use(cors())


////////////////////////



// Login/Register Routes

app.post('/login', (req, res, next) => {
  passport.authenticate('local', { failureRedirect: '/login'}, (err, user, info) => {
    if (err) {
      return next(err)
    };
    console.log(user)
    if (!user) res.send("Error");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        console.log(user)
        res.send(user);
      });
    }
  })(req, res, next);
});

app.post('/signup', async (req,res) =>{
  const validationErrors = []
  if(req.body.username.length < 1){
    validationErrors.push('Username cannot be blank')
  } 
  if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push('Password must be at least 8 characters long')
  if(req.body.password !== req.body.confirmPassword){
    validationErrors.push('Passwords do not match')
  } 
  if(validationErrors.length) {
    res.send(validationErrors)
  } else{

  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) {
      validationErrors.push("User Already Exists");
      res.send(validationErrors)
    }
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      await newUser.save();
      let currentUser = await User.findOne({ username: req.body.username })
      res.send(currentUser)
    }
  })};
});

app.get('/logout', async (req,res, next) => {
  req.session.destroy((err) => {
    if (err) { return next(err); }
    res.send('Logged out');
  });
});

app.get('/user', async (req,res) => {
  let currentUser = await User.findOne({ user: req.user })
  res.send(currentUser.username)
})

///////////////////////////////


// Tea Routes

app.get('/userCollection', async function(req, res){
  try {
    let userid = req.query.userID
    console.log(userid)
    let userTeas = await Teas.find({user: {$in: userid}})
    res.send(userTeas)
  } catch (error) {
    console.log(error)
  }});

app.get('/collection', async (req, res) => {
  try {
    let teas = await Teas.find({})
    res.send(teas)
  } catch (error) {
    console.log(error)
  }});

app.get('/filter', async (req, res) => {
  try {
    let type = req.query.type
    let flavor = req.query.flavor
    let region = req.query.region
    let caffeine = req.query.caffeine

    let teaType = await Teas.find({type: type})
    let teaRegion = await Teas.find({region: region})
    let teaFlavor = await Teas.find({flavor: flavor})
    let teaCaffeine = await Teas.find({caffeine: caffeine})
      
    let search = await Teas.find({ $or: [{type: type}, {region: region}, {flavor: {$in: flavor}}, {caffeine: caffeine}]})

    let conditions = {}

    if(type != '') conditions.type = type
    if(flavor != '') conditions.flavor = flavor
    if(region != '') conditions.region = region
    if(caffeine != '') conditions.caffeine = caffeine

    let exactSearch = await Teas.aggregate([{ $match: conditions}])

    res.send({exactSearch, search, teaType, teaRegion, teaFlavor, teaCaffeine, type, flavor, region, caffeine, conditions})
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

app.post('/addTea', async(req,res) => {
    try {
      let user = req.query.user
      let teaID = req.query.id
      console.log(user, teaID)
      let tea = await Teas.findByIdAndUpdate({_id: teaID}, 
        {$addToSet: {user: user}})
        res.send(tea)
    } catch (error) {
      console.log(error)
    }
})

app.delete('/deleteTea', async(req,res) => {
  try {
    let user = req.query.user
    let teaID = req.query.id
    console.log(teaID)
    let tea = await Teas.findByIdAndUpdate({_id: teaID}, 
      {$pull: {user: user}})
      res.send(tea)
  } catch (error) {
    console.log(error)
  }
})

// PORT
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

