// app.js
const express = require('express');
const app = express();
const port = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Authentication middleware
const { authenticate } = require('./utils/auth');
app.use(authenticate);

// Routes
const usersRouter = require('./routes/users');
const todosRouter = require('./routes/todos');
const tagsRouter = require('./routes/tags');

app.use('/users', usersRouter);
app.use('/todos', todosRouter);
app.use('/tags', tagsRouter);

// Database connection
const { db } = require('./utils/db');

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});