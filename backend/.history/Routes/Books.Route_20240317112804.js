const express = require('express');
const Auth = require('../Middleware/auth.middleware');
const Access = require('../Middleware/access.middleware');
const { Book } = require('../Models/Book.model');

const BooksRoute = express.Router();

// GET BOOKS
BooksRoute.get('/', Auth, Access('VIEW_ALL', 'VIEWER'), async (req, res) => {
  try {
    if (req.role == 'VIEW_ALL') {
      const Books = await Book.find();
    } console.log(Books);
    res.status(200).json({ Books });
  } catch (error) {
    res.status(400).json({ Message: error.message });
  }
});

// Create BOOKS

BooksRoute.post('/', Auth, Access('CREATOR', 'VIEWER'), async (req, res) => {
  try {
    const payload = req.body;
    const newBook = Book({ ...payload, createdBy: req.id });
    newBook.save();
    res.status(200).json({ Message: 'Book Successfully Created' });
  } catch (error) {
    res.status(200).json({ Message: error.message });
  }
});

// Update Books

BooksRoute.patch('/', Auth, Access('CREATOR'), (req, res) => {
  res.status(200).json({ Message: ' Books' });
});

// Delete Books

BooksRoute.delete('/', Auth, Access('CREATOR'), (req, res) => {
  res.status(200).json({ Message: ' Books' });
});

module.exports = BooksRoute;
