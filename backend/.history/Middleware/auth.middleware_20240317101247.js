const jwt = require('jsonwebtoken');

const Auth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.KEY, (err, decoded) => {
      if (err) {
        res.status(400).json({ err });
      }
      if (decoded) {
        const { userID, Role } = decoded;
        console.log(userID, role);
        next();
      }
    });
  } catch (error) {
    res.status(400).json({ Messae: error.message });
  }
};
module.exports = Auth;
