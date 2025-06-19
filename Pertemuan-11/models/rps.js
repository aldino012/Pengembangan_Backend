const {DataTypes} = require('sequelize');
const mahasiswa = require('./mahasiswa');
const { RPS } = require('.');
module.exports = (sequelize) => {
    return sequelize.define('rps', {


        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        
        mahasiswaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true
            }
        },
        matakuliahId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        rps:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }

    });
}