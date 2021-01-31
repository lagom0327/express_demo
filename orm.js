const { Sequelize } = require("sequelize");
const dbData = require("./db");
const { database, user, password } = dbData;
const sequelize = new Sequelize(database, user, password, {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
