const express = require("express");

const userRouter = express.Router();

userRouter.post("/login", async (req, res) => {
  try {
    { Username, Email, Pass; }
  } catch (error) {
    res.status(400).json({ error });
  }

  // res.status(200).json({ Message: "Login Page" });
});

userRouter.get("/register", (req, res) => {
  res.status(200).json({ Message: "Register Page" });
});

module.exports = { userRouter };
