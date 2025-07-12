const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Username tidak boleh kosong" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Format email tidak valid" },
        notEmpty: { msg: "Email tidak boleh kosong" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Password tidak boleh kosong" },
      },
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
    },
    photo: {
      type: DataTypes.STRING, // simpan nama file (path relatif)
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: true, // otomatis buat createdAt & updatedAt
  }
);

module.exports = User;
