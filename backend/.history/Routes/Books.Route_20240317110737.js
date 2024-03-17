const express = require('express');
const Auth = require('../Middleware/auth.middleware');
const Access = require('../Middleware/access.middleware');

const BooksRoute = express.Router();

// GET BOOKS
BooksRoute.get('/', Auth, Access('VIEW_ALL', 'VIEWER'), (req, res) => {
  res.status(200).json({ Message: ' Books' });
});

// Create BOOKS

BooksRoute.post('/', Auth, Access('VIEW_ALL', 'VIEWER'), (req, res) => {
  res.status(200).json({ Message: ' Books' });
});

// Update Books

BooksRoute.post('/', Auth, Access('VIEW_ALL', 'VIEWER'), (req, res) => {
  res.status(200).json({ Message: ' Books' });
});

// Delete Books

module.exports = BooksRoute;
