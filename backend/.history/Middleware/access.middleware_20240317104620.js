const Access = (...permittedRoles) => (req, res, next) => {
  // Check if req.roles is an array and if any of the roles are permitted
  if (Array.isArray(req.roles) && req.roles.some((role) => permittedRoles.includes(role))) {
    next();
  } else {
    res.status(403).json({ msg: 'You have no access' });
  }
};

module.exports = Access;
