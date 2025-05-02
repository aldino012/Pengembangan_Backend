const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Mahasiswa = sequelize.define('mahasiswa', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nim: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jurusan: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
}, {
    tableName: 'mahasiswa',
    timestamps: false, // Disable timestamps if not needed
});

module.exports = Mahasiswa;




