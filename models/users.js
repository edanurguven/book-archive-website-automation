const { DataTypes } = require("sequelize");
const db = require("../data/db");
const Users = db.define(
  "users",
  {
    name: { type: DataTypes.STRING(100) },
    surname: { type: DataTypes.STRING(100) },
    email: { type: DataTypes.STRING(50) },
    password: { type: DataTypes.STRING(200) },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
    },
  },
  { timestamps: true }
);

module.exports = Users;
