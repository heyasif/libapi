const express = require('express');
const Auth = require('../Middleware/auth.middleware');

const BooksRoute = express.Router();

BooksRoute.get('/', Auth, (req, res) => {
  res.status(400).json({ Message: ' Wrong Password' });
});

module.exports = BooksRoute;
