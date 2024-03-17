const express = require('express');
const Auth = require('../Middleware/auth.middleware');
const Access = require('../Middleware/access.middleware');
const { Book } = require('../Models/Book.model');

const BooksRoute = express.Router();
BooksRoute.get('/', Auth, Access('VIEW_ALL', 'VIEWER'), async (req, res) => {
  try {
    const filter = {};
    const sort = {};
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

    // Time-based filters
    if (req.query.old) {
      filter.createdAt = { $lte: tenMinutesAgo };
    } else if (req.query.new) {
      filter.createdAt = { $gt: tenMinutesAgo };
    }

    // Apply role-based filtering
    // Only apply createdBy filter for VIEWER role, VIEW_ALL has access to all books
    if (req.role === 'VIEWER') {
      filter.createdBy = req.id; // Ensure VIEWER role only accesses their books
    }

    // General filters (e.g., title, author)
    if (req.query.title) {
      filter.title = { $regex: req.query.title, $options: 'i' }; // Case-insensitive search
    }
    if (req.query.author) {
      filter.author = { $regex: req.query.author, $options: 'i' };
    }

    // Sorting
    if (req.query.sortBy && req.query.order) {
      // Example: sortBy=title&order=desc
      sort[req.query.sortBy] = req.query.order === 'desc' ? -1 : 1;
    } else {
      // Default sorting by createdAt if no sorting parameters are provided
      sort.createdAt = -1;
    }

    const books = await Book.find(filter).sort(sort);
    res.status(200).json({ books });
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

BooksRoute.delete('/:ID', Auth, Access('CREATOR'), async (req, res) => {
  try {
    const { ID } = req.params;

    if (ID) {
      const DeletedBook = await Book.findByIdAndDelete(ID);
      if (DeletedBook) {
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