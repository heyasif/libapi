const express = require('express');
const Auth = require('../Middleware/auth.middleware');
const Access = require('../Middleware/access.middleware');
const { Book } = require('../Models/Book.model');

const BooksRoute = express.Router();

// GET BOOKS
BooksRoute.get('/', Auth, Access('VIEW_ALL', 'VIEWER'), async (req, res) => {
  try {
    let Books = {};
    if (req.role === 'VIEW_ALL') {
      Books = await Book.find();
    } else {
      Books = await Book.find({ createdBy: req.id });
    }
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

BooksRoute.patch('/:ID', Auth, Access('CREATOR'), async (req, res) => {
  try {
    const { ID } = req.params;
    const payload = req.body;

    if (ID) {
      const UpdatedBook = await Book.findByIdAndUpdate(ID, payload);
      if (UpdatedBook) {
        res.status(200).json({ Message: 'Book Updated' });
      } else {
        res.status(200).json({ Message: 'Book Not Updated' });
      }
    } else {
      res.status(200).json({ Message: 'Invalid Book Id' });
    }
  } catch (error) {
    res.status(200).json({ Message: error.message });
  }
});

// Delete Books

BooksRoute.patch('/:ID', Auth, Access('CREATOR'), async (req, res) => {
  try {
    const { ID } = req.params;

    if (ID) {
      const UpdatedBook = await Book.findByIdAndDelete(ID);
      if (UpdatedBook) {
        res.status(200).json({ Message: 'Book Deleted' });
      } else {
        res.status(200).json({ Message: 'Book Not Deleted' });
      }
    } else {
      res.status(200).json({ Message: 'Invalid Book Id' });
    }
  } catch (error) {
    res.status(200).json({ Message: error.message });
  }
});

module.exports = BooksRoute;
