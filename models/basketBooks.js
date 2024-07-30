const { DataTypes } = require("sequelize");
const db = require("../data/db");

const BasketBooks = db.define(
  "BasketBooks",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    basketId: {
      type: DataTypes.INTEGER,
      references: { model: "Baskets", key: "id" },
    },
    bookId: {
      type: DataTypes.INTEGER,
      references: { model: "Books", key: "id" },
    },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  },
  { timestamps: false }
);

module.exports = BasketBooks;
