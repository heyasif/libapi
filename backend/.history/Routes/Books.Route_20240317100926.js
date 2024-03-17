const express = require('express');
const Auth = require('../Middleware/auth.middleware');

const BooksRoute = express.Router();

BooksRoute.get('/', Auth, (req, res) => {
  res.status(200).json({ Message: ' Books' });
});

module.exports = BooksRoute;
