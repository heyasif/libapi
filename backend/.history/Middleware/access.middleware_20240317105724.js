const Access = (...allowed) => (req, res, next) => {
  if (allowed.includes(req.role)) {
    next();
  } else {

  }
};
module.exports = { Access };
