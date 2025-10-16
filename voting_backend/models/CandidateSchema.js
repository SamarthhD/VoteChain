// ===== CandidateModel.js =====
const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  accountAddress: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  party: {
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

const CandidateModel = mongoose.model('Candidate', CandidateSchema);
module.exports = CandidateModel;