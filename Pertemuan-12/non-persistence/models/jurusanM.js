const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Jurusan = sequelize.define(
  "jurusan",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    kode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nama_jurusan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "jurusan",
    timestamps: false,
  }
);

module.exports = Jurusan;
