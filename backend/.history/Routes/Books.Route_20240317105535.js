const express = require('express');
const Auth = require('../Middleware/auth.middleware');
const Access = require('../Middleware/access.middleware');

const BooksRoute = express.Router();

BooksRoute.get('/', Auth, Access('VIEW_ALL', 'VIEWER'), (req, res) => {
  res.status(200).json({ Message: ' Books' });
});

module.exports = BooksRoute;
