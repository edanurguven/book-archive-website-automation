const { Sequelize } = require("sequelize");
const db = new Sequelize("newproject", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});
async function connect() {
  try {
    await db.authenticate();
    console.log("Veri Tabanına Bağlandı");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
connect();
module.exports = db;
