// routes/todos.js
const express = require('express');
const router = express.Router();
const { Todo } = require('../models');
const { authenticate } = require('../utils/auth');

router.get('/', authenticate, async (req, res) => {
  const todos = await Todo.findAll({ where: { userId: req.user.id } });
  res.json(todos);
});

router.post('/', authenticate, async (req, res) => {
  const { title, description } = req.body;
  const todo = await Todo.create({ title, description, userId: req.user.id });
  res.json(todo);
});

router.get('/:id', authenticate, async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.findOne({ where: { id, userId: req.user.id } });
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.json(todo);
});

router.put('/:id', authenticate, async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  const todo = await Todo.findOne({ where: { id, userId: req.user.id } });
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  todo.title = title;
  todo.description = description;
  await todo.save();
  res.json(todo);
});

router.delete('/:id', authenticate, async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.findOne({ where: { id, userId: req.user.id } });
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  await todo.destroy();
  res.json({ message: 'Todo deleted' });
});

module.exports = router;