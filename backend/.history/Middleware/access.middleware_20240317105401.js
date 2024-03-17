const Access = (...permittedRoles) => (req, res, next) => {
  console.log('see', req.role);
  if (permittedRoles.includes(req.role)) {
    next();
  } else {
    res.json({ msg: 'You have no access' });
  }
};

module.exports = Access;
