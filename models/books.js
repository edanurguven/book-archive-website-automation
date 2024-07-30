const { DataTypes } = require("sequelize");
const db = require("../data/db");
const Books = db.define(
  "books",
  {
    name: { type: DataTypes.STRING(100) },
    author: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    url: { type: DataTypes.STRING(200) },
    price: { type: DataTypes.STRING },
  },
  { timestamps: true }
);

module.exports = Books;
