const express = require("express");
const { User } = require("../Models/User.model");

const userRouter = express.Router();

// userRouter.post("/login", async (req, res) => {
//   try {
//     const { Email, Pass } = req.body;
//     console.log(Email, Pass);
//     const Userinfo = User.findOne(Email);

//     if (Userinfo) {
//       res.status(400).json({ Message: "Login Successfull" });
//     } else {
//       res.status(400).json({ Message: "Wrong Email" });
//     }
//   } catch (error) {
//     res.status(400).json({ error });
//   }

//   // res.status(200).json({ Message: "Login Page" });
// });

userRouter.post("/register", async (req, res) => {
  console.log("Register Page");
  try {
    const { Username, Email, Pass } = req.body;
    const Userinfo = User.findOne(Email);

    if (Userinfo) {
      const newUser = new User({ Username, Email, Pass });
      await newUser.save();

      res.status(400).json({ Message: "Registration Successfull" });
    } else {
      res.status(400).json({ Message: "Email Exists" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = { userRouter };
