const express = require('express');
const { userRouter } = require('./Routes/User.Route');
const { ConnectDatabase } = require('./config/db');
const BooksRoute = require('./Routes/Books.Route');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/users', userRouter);
app.use('/books', BooksRoute);

app.listen(process.env.PORT, () => {
  ConnectDatabase();
  console.log(`Connected Server to Port ${process.env.PORT}`);
});
