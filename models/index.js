const { Sequelize, DataTypes } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

const sequelize = new Sequelize(config);

//checking if connection is done
sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connected to ${config.database}, env: ${env}`);
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
