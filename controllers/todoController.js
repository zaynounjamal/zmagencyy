// controllers/todoController.js
const { Todo } = require('../models');

const getTodos = async (req, res) => {
  const todos = await Todo.findAll({ where: { userId: req.user.id } });
  res.json(todos);
};

const createTodo = async (req, res) => {
  const todo = await Todo.create({ title: req.body.title, description: req.body.description, userId: req.user.id });
  res.json(todo);
};

const updateTodo = async (req, res) => {
  const todo = await Todo.findOne({ where: { id: req.params.id, userId: req.user.id } });
  todo.title = req.body.title;
  todo.description = req.body.description;
  await todo.save();
  res.json(todo);
};

const deleteTodo = async (req, res) => {
  const todo = await Todo.findOne({ where: { id: req.params.id, userId: req.user.id } });
  await todo.destroy();
  res.json({ message: 'Todo deleted' });
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };