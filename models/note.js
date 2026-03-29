const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  text: String,
  userId: String
});

module.exports = mongoose.model('Note', noteSchema);