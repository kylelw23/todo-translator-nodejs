const Sequelize = require("sequelize");

module.exports = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "postgres",
  username: "postgres",
  password: "Password@23",
  database: "todo_translator_development",
});
