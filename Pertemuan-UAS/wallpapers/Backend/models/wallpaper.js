// models/wallpaper.js
const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const Wallpaper = sequelize.define(
  "Wallpaper",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uploader: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    resolution: {
      type: DataTypes.STRING(20),
      defaultValue: null,
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "wallpapers",
    timestamps: false,
  }
);

module.exports = Wallpaper;
