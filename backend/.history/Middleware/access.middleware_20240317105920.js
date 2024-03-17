const Access = (...allowed) => (req, res, next) => {
  if (allowed.includes(req.role)) {
    next();
  } else {
    res.status(200).json({ Message: 'No Access' });
  }
};
module.exports = Access;
