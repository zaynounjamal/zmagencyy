// models/todoTag.js
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TodoTag = sequelize.define('TodoTag', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    todoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Todo',
        key: 'id',
      },
    },
    tagId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tag',
        key: 'id',
      },
    },
  });

  return TodoTag;
};