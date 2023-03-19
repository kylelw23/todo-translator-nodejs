//importing modules
const express = require("express");
const userController = require("../controllers/userController");
const { signup, login, logout, checkLogin, getAllUsers, getUserUsage } =
  userController;
const userAuth = require("../Middlewares/userAuth");

const router = express.Router();

//signup endpoint
//passing the middleware function to the signup
router.post("/signup", userAuth.saveUser, signup);

//login route
router.post("/login", login);

//Logout route
router.get("/logout", logout);

//Check login
router.get("/check", checkLogin);

//Get all users for amin
router.get("/allUsers", getAllUsers);

//Get userusage by userid
router.get("/userusage/:userId", getUserUsage);

module.exports = router;
