const Auth = (req, res) => {
  try {
    jwt.verify(token, 'shhhhh', (err, decoded) => {
      console.log(decoded.foo); // bar
    });
  } catch (error) {
    res.status(400).json({ Messae: error.message });
  }
};
module.exports = Auth;
