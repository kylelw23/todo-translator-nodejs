//importing modules
const express = require("express");
const userController = require("../controllers/userController");
const { signin, login, checkLogin, getAllUsers, getUserUsage } = userController;
const userAuth = require("../Middlewares/userAuth");

const router = express.Router();

//signin endpoint
//passing the middleware function to the signin
router.post("/signin", userAuth.saveUser, signin);

//login route
router.post("/login", login);

//Check login
router.get("/check", checkLogin);

//Get all users for amin
router.get("/allUsers", getAllUsers);

//Get userusage by userid
router.get("/userusage/:userId", getUserUsage);

module.exports = router;
