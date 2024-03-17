const jwt = require('jsonwebtoken');

const Auth = (req, res) => {
  try {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.KEY, (err, decoded) => {
      console.log(decoded.foo); // bar
    });
  } catch (error) {
    res.status(400).json({ Messae: error.message });
  }
};
module.exports = Auth;
