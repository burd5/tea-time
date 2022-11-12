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
  }
});

const Teas = mongoose.model('Tea', TeaSchema)
module.exports = Teas;