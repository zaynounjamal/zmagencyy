// controllers/tagController.js
const { Tag } = require('../models');

const getTags = async (req, res) => {
  const tags = await Tag.findAll();
  res.json(tags);
};

const createTag = async (req, res) => {
  const tag = await Tag.create({ name: req.body.name });
  res.json(tag);
};

const updateTag = async (req, res) => {
  const tag = await Tag.findOne({ where: { id: req.params.id } });
  tag.name = req.body.name;
  await tag.save();
  res.json(tag);
};

const deleteTag = async (req, res) => {
  const tag = await Tag.findOne({ where: { id: req.params.id } });
  await tag.destroy();
  res.json({ message: 'Tag deleted' });
};

module.exports = { getTags, createTag, updateTag, deleteTag };