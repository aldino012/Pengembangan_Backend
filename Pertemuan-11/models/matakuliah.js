const {DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    return sequelize.define('matakuliah', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        nama_matkul: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        kode_matkul: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
}