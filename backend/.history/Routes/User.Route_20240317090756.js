const express = require("express");

const userRouter = express.Router();

userRouter.post("/login", (req, res) => {
  res.status(200).json({ Message: "Login Page" });
});

userRouter.get("/register", (req, res) => {
  res.status(200).json({ Message: "Register Page" });
});

module.exports = { userRouter };
