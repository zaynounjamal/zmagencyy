// routes/tags.js
const express = require('express');
const router = express.Router();
const { Tag } = require('../models');
const { authenticate } = require('../utils/auth');

router.get('/', authenticate, async (req, res) => {
  const tags = await Tag.findAll();
  res.json(tags);
});

router.post('/', authenticate, async (req, res) => {
  const { name } = req.body;
  const tag = await Tag.create({ name });
  res.json(tag);
});

router.get('/:id', authenticate, async (req, res) => {
  const id = req.params.id;
  const tag = await Tag.findOne({ where: { id } });
  if (!tag) {
    return res.status(404).json({ error: 'Tag not found' });
  }
  res.json(tag);
});

router.put('/:id', authenticate, async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  const tag = await Tag.findOne({ where: { id } });
  if (!tag) {
    return res.status(404).json({ error: 'Tag not found' });
  }
  tag.name = name;
  await tag.save();
  res.json(tag);
});

router.delete('/:id', authenticate, async (req, res) => {
  const id = req.params.id;
  const tag = await Tag.findOne({ where: { id } });
  if (!tag) {
    return res.status(404).json({ error: 'Tag not found' });
  }
  await tag.destroy();
  res.json({ message: 'Tag deleted' });
});

module.exports = router;