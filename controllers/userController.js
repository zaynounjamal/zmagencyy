// controllers/userController.js
const { User } = require('../models');

const getUser = async (req, res) => {
  const user = await User.findOne({ where: { id: req.user.id } });
  res.json(user);
};

const updateUser = async (req, res) => {
  const user = await User.findOne({ where: { id: req.user.id } });
  user.name = req.body.name;
  user.email = req.body.email;
  await user.save();
  res.json(user);
};

module.exports = { getUser, updateUser };