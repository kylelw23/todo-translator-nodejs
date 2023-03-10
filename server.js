//importing modules
const express = require("express");
const sequelize = require("sequelize");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const db = require("./models");
const userRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todos");
const userUsageRoutes = require("./routes/userusage");
const cors = require("cors");

//setting up your port
const PORT = process.env.PORT || 8080;

//assigning the variable app to express
const app = express();

app.use(
  cors({
    origin: [
      "https://todo-translator-frontend-ki6dd2uvya-uc.a.run.app",
      "http://localhost:4200",
    ],
    optionsSuccessStatus: 200,
  })
);

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
app.use("/", userUsageRoutes);

//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
