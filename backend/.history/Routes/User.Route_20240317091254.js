const express = require("express");
const { User } = require("../Models/User.model");

const userRouter = express.Router();

userRouter.post("/login", async (req, res) => {
  try {
    const { Username, Email, Pass } = req.body;
    console.log(Username, Email, Pass);
    const Userinfo = User.findOne(Email);

    if (Userinfo) {
      res.status(400).json({ Message: "Login Successfull" });
    } else {
      res.status(400).json({ Message: "Wrong Email" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }

  // res.status(200).json({ Message: "Login Page" });
});

userRouter.get("/register", (req, res) => {
  res.status(200).json({ Message: "Register Page" });
});

module.exports = { userRouter };
