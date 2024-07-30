const { DataTypes } = require("sequelize");
const db = require("../data/db");

const Basket = db.define(
  "Basket",
  {
    userId: { type: DataTypes.INTEGER, allowNull: false }, // Assuming each basket belongs to a user
  },
  { timestamps: true }
);

module.exports = Basket;
