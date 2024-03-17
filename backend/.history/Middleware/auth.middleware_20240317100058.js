const Auth = (req, res) => {
  try {

  } catch (error) {
    res.status(400).json({ Messae: error.message });
  }
};
module.exports = Auth;
