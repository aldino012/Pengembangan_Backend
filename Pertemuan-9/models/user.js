const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db.js');

const User = sequelize.define('user', {
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    },
});

module.exports = User;sequelize