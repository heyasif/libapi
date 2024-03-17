const mongoose = require('mongoose');
const { User } = require('./User.model');

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
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const Book = mongoose.model('Users', BookSchema);
module.exports = { Book };
