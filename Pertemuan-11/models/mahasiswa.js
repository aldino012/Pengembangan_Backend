const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "mahasiswa",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nim: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      tableName: "mahasiswa",
      timestamps: false,
    }
  );
};
