// models/index.js
const Sequelize = require('sequelize');
const sequelize = new Sequelize('akademik', 'aldino', 'aldino12', {
  host: 'localhost',
  dialect: 'mysql'
});

// export untuk dipakai di file lain
module.exports = {
  Sequelize,
  sequelize,
};
