const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: date,
  },

});

const Book = mongoose.model('Users', BookSchema);
module.exports = { Book };
