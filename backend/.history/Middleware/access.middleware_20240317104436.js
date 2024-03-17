const access = (...permittedRoles) => (req, res, next) => {
  if (permittedRoles.includes(req.roles)) {
    next();
  } else {
    res.json({ msg: 'You have no access' });
  }
};

module.exports = access;
