//importing modules
const express = require("express");
const sequelize = require("sequelize");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const db = require("./Models");
const userRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todos");
const cors = require("cors");

//setting up your port
const PORT = process.env.PORT || 8080;

//assigning the variable app to express
const app = express();

app.use(cors());

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync().then(() => {
  console.log("db has been re sync");
});

//routes for the user API
app.use("/auth", userRoutes);
app.use("/", todoRoutes);

//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
