const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('mydatabase', 'root', null, {
  host: '127.0.0.1',
  dialect: 'mysql'
});

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: DataTypes.STRING
});

sequelize.sync({ force: true })
  .then(() => {
    console.log('Database created successfully.');
  })
  .catch(err => {
    console.error('Error creating database:', err);
  });