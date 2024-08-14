// routes/users.js
const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { authenticate } = require('../utils/auth');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  res.json(user);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = authenticate(user);
  res.json({ token });
});

router.get('/me', authenticate, async (req, res) => {
  const user = req.user;
  res.json(user);
});

module.exports = router;