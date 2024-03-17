const Access = (...allowed) => (req, res, next) => {
  if (allowed.includes(req.role)) {
    next();
  } else {
    res.staus(200).json({ Message: 'No Access' });
  }
};
module.exports = { Access };
