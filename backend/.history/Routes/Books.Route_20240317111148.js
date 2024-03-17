const express = require('express');
const Auth = require('../Middleware/auth.middleware');
const Access = require('../Middleware/access.middleware');

const BooksRoute = express.Router();

// GET BOOKS
BooksRoute.get('/', Auth, Access('VIEW_ALL', 'VIEWER'), (req, res) => {
  res.status(200).json({ Message: ' Books' });
});

// Create BOOKS

BooksRoute.post('/', Auth, Access('CREATOR', 'VIEWER'), async (req, res) => {
  try {
    const payload = req.body();
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
