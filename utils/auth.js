// utils/auth.js
const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key';

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

const generateToken = (user) => {
  const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
    expiresIn: '1h',
  });
  return token;
};

module.exports = { authenticate, generateToken };