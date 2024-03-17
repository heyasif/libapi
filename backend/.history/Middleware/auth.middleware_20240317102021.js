const jwt = require('jsonwebtoken');
const { User } = require('../Models/User.model');

const Auth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.KEY, async (err, decoded) => {
      if (err) {
        res.status(400).json({ err });
      }
      if (decoded) {
        const { userID } = decoded;
        const UserDetails = await User.findById(userID);
        // eslint-disable-next-line no-underscore-dangle
        req.id = UserDetails._id;
        req.role = UserDetails.Role:;

        console.log(UserDetails);
        next();
      }
    });
  } catch (error) {
    res.status(400).json({ Messae: error.message });
  }
};
module.exports = Auth;
