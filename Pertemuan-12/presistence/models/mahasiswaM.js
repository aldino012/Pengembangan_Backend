const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Mahasiswa = sequelize.define(
  "mahasiswa",
  {
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
      unique: true,
    },
    jurusan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "mahasiswa",
    timestamps: false,
  }
);

module.exports = Mahasiswa;
