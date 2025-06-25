const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("akademik", "root", "root123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
