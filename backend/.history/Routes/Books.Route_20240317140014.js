const express = require('express');
const Auth = require('../Middleware/auth.middleware');
const Access = require('../Middleware/access.middleware');
const { Book } = require('../Models/Book.model');

const BooksRoute = express.Router();
// GET books with filters, sorting, and pagination
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

    // Role-based filtering
    if (req.role === 'VIEWER') {
      filter.createdBy = req.id;
    }

    // General filters (title, author)
    if (req.query.title) {
      filter.title = { $regex: req.query.title, $options: 'i' };
    }
    if (req.query.author) {
      filter.author = { $regex: req.query.author, $options: 'i' };
    }

    // Sorting
    if (req.query.sortBy && req.query.order) {
      sort[req.query.sortBy] = req.query.order === 'desc' ? -1 : 1;
    } else {
      sort.createdAt = -1;
    }

    // Pagination parameters
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // Fetching books with pagination
    const books = await Book.find(filter).sort(sort).skip(skip).limit(limit);
    const totalBooks = await Book.countDocuments(filter);

    // Pagination response
    res.status(200).json({
      total: totalBooks,
      page,
      pages: Math.ceil(totalBooks / limit),
      limit,
      data: books,
    });
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

// Bulk Add Books
BooksRoute.post('/bulk', Auth, Access('CREATOR'), async (req, res) => {
  try {
    // Assuming req.body is an array of book objects
    const booksData = req.body;

    // Validate booksData if necessary

    // Use Book.insertMany() for bulk insertion
    const newBooks = await Book.insertMany(booksData.map((book) => ({
      ...book,
      createdBy: req.id,
    })));

    res.status(201).json({ Message: 'Books Successfully Added', data: newBooks });
  } catch (error) {
    res.status(400).json({ Message: error.message });
  }
});

module.exports = BooksRoute;
