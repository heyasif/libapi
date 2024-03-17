const jwt = require('jsonwebtoken');

const Auth = (req, res) => {
  try {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.KEY, (err, decoded) => {
      if (err) {
        res.status(400).json({ err });
      }
      if (decoded) {
        console.log(decoded);
        res.status(200).json({ err });
      }
    });
  } catch (error) {
    res.status(400).json({ Messae: error.message });
  }
};
module.exports = Auth;
