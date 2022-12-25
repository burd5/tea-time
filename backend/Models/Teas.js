const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let TeaSchema = new Schema({
  name: {
    type: String
  },
  type: {
    type: String
  },
  region: {
    type: String
  },
  flavor: {
    type: Array
  },
  caffeine: {
    type: String
  }, 
  user: {
    type: String,
    ref: 'User',
}
});

const Teas = mongoose.model('Tea', TeaSchema)
module.exports = Teas;