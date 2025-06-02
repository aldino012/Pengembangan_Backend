const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('presensi', 'root', 'root123', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // Disable logging for cleaner output
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
    });

module.exports = sequelize;
