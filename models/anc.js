const { DataTypes } = require("sequelize");
const db = require("../data/db");
const Anc = db.define(
  "anc",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exp: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, //tabloya createdAt ve updatedAt olmak üzere 2 otomatik field ekler.
  //Bu alnaların otomatik eklenmesini istemiyorsanız aşağıdaki özelliği eklemelisiniz.
  { timestamps: true }
);

module.exports = Anc;
