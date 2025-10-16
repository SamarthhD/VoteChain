const mongoose = require('mongoose');

const VoterSchema = new mongoose.Schema({
  accountAddress: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: Number,
    required: true
  },
  imageName: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const VoterModel = mongoose.model('Voter', VoterSchema);
module.exports = VoterModel;