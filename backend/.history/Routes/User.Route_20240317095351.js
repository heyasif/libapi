const express = require("express");
const { User } = require("../Models/User.model");

const userRouter = express.Router();
const bcrypt = require("bcrypt");

userRouter.post("/login", async (req, res) => {
  try {
    const { Email, Pass } = req.body;
    console.log(Email, Pass);
    const Userinfo = await User.findOne({ Email });

    if (Userinfo) {
      bcrypt.compare(Pass, Userinfo.Pass, (err, result) => {
        if (err) {
          res.status(400).json({ Message: " Wrong Password" });
        }
        if (result) {
          res.status(400).json({ Message: " Login SucessFull" });
        }
      });
    } else {
      res.status(400).json({ Message: "Wrong Email" });
    }
  } catch (error) {
    res.status(400).json({ Message: error.message });
  }

  // res.status(200).json({ Message: "Login Page" });
});

userRouter.post("/register", async (req, res) => {
  try {
    const {
      Username, Email, Pass, Role,
    } = req.body;
x    const Userinfo = await User.findOne({ Email });
    if (!Userinfo) {
      const HashedPassword = await bcrypt.hash(Pass, 5);
      const newUser = new User({
        Username, Email, Pass: HashedPassword, Role,
      });
      await newUser.save();

      res.status(400).json({ Message: "Registration Successfull" });
    } else {
      res.status(400).json({ Message: "Email Exists" });
    }
  } catch (error) {
    res.status(400).json({ Message: error.message });
  }
});

module.exports = { userRouter };
