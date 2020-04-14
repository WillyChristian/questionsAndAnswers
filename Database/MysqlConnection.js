const sequelize = require('sequelize')

const connection = new sequelize("Questions", "root", "1321", {
  host: "localhost",
  dialect: 'mysql'
});

module.exports = connection