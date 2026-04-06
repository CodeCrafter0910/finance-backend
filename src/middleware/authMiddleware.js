const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication token missing or invalid' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key_for_learning');

    const user = await User.findById(decoded.id).populate('role');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.active) {
      return res.status(403).json({ message: 'User is inactive' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Authentication error', error: error.message });
  }
};

module.exports = { authenticate };
