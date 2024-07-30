const { DataTypes } = require("sequelize");
const db = require("../data/db");

const VisitCounter = db.define("VisitCounter", {
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = VisitCounter;
