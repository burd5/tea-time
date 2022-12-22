const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: 
    { 
      type: String,
    },
  password: 
    {
      type: String,
    },
  img:
    {
      type: String,
      require: true,
      default: 'https://ctorthopaedic.com/wp-content/uploads/2017/01/profile-silhouette.jpg',
    },
  teas:
    [{
      type: String,
      ref: 'Teas',
    }]
})

module.exports = mongoose.model('User', UserSchema)