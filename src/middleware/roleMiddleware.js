const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const userPermissions = user.role.permissions || [];

    if (!userPermissions.includes(requiredPermission)) {
      return res.status(403).json({
        message: 'Access denied',
        reason: `User does not have ${requiredPermission} permission`,
        userRole: user.role.name
      });
    }

    next();
  };
};

const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (!allowedRoles.includes(user.role.name)) {
      return res.status(403).json({
        message: 'Access denied',
        reason: `Only ${allowedRoles.join(', ')} can access this resource`,
        userRole: user.role.name
      });
    }

    next();
  };
};

module.exports = { checkPermission, checkRole };
