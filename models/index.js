//importing modules
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  "todo_translator_development",
  "postgres",
  "Password@23",
  {
    host: "localhost",
    dialect: "postgres",
  }
);

//checking if connection is done
sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connected to todo_translator_development`);
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};
db.sequelize = sequelize;

//connecting to model
db.users = require("./users")(sequelize, DataTypes);
db.todos = require("./todos")(sequelize, DataTypes);
db.userusage = require("./userusage")(sequelize, DataTypes);

//exporting the module
module.exports = db;
