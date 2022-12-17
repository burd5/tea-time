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
    type: String
  },
  caffeine: {
    type: String
  }, 
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
}],
});

const Teas = mongoose.model('Tea', TeaSchema)
module.exports = Teas;