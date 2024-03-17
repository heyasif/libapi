const Access = (...accessRoles) => (res, req, next) => {
  if (accessRoles.includes(req.roles)) {
    next();
  } else {
    res.status(403).json({ msg: 'You have no access' });
  }
};

module.exports = { Access };
