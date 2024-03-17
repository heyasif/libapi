const express = require("express");

const userRouter = express.Router();

userRouter.get("/login", (req, res) => {
  res.status(200).json({ Message: "Login Page" });
});

module.exports = { userRouter };
