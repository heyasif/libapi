const express = require('express');
const Auth = require('../Middleware/auth.middleware');
const Access = require('../Middleware/access.middleware');

const BooksRoute = express.Router();

// GET BOOKS {VIEW_ALL}
BooksRoute.get('/', Auth, Access('VIEW_ALL', 'VIEWER'), (req, res) => {
  res.status(200).json({ Message: ' Books' });
});

// Create BOOKS {CREATOR,VIEWER}

BooksRoute.post('/', Auth, Access('CREATOR', 'VIEWER'), (req, res) => {
  res.status(200).json({ Message: ' Books' });
});

// Update Books

BooksRoute.patch('/', Auth, Access('VIEW_ALL', 'VIEWER'), (req, res) => {
  res.status(200).json({ Message: ' Books' });
});

// Delete Books

BooksRoute.delete('/', Auth, Access('VIEW_ALL', 'VIEWER'), (req, res) => {
  res.status(200).json({ Message: ' Books' });
});

module.exports = BooksRoute;
