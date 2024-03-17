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
    const id = req.params.ID;
    const payload = req.body;

    if (id) {
      const query = { _id: id };

      await Book.findOneAndUpdate(query, { title: 'Updated Book' });
    } else {
      res.status(200).json({ Message: 'Invalid Book Id' });
    }
  } catch (error) {
    res.status(200).json({ Message: error.message });
  }
});

// Delete Books

BooksRoute.delete('/', Auth, Access('CREATOR'), (req, res) => {
  res.status(200).json({ Message: ' Books' });
});

module.exports = BooksRoute;
