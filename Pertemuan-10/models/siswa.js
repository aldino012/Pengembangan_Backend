const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Siswa = sequelize.define(
  "Siswa",
  {
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    nisn: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    
  },
  {
    tableName: "siswa",
    timestamps: false,
  }
);

module.exports = Siswa;
