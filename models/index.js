// models/index.js
const { db } = require('../utils/db');
const User = require('./user');
const Todo = require('./todo');
const Tag = require('./tag');
const TodoTag = require('./todoTag');

User.init(db);
Todo.init(db);
Tag.init(db);
TodoTag.init(db);

module.exports = { User, Todo, Tag, TodoTag };