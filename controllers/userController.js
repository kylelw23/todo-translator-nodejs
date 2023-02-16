//importing modules
const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

// Assigning users to the variable User
const User = db.users;
const UserUsage = db.userusage;

//signing a user
//hashing users password before its saved to the database with bcrypt
const signin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const data = {
      username,
      email,
      password: await bcrypt.hash(password, 10),
      type: "user",
    };
    //saving the user
    const user = await User.create(data);

    //if user details is captured
    //generate token with the user's id and the secretKey in the env file
    // set cookie with the token generated
    if (user) {
      let token = jwt.sign(
        { id: user.id, type: user.type },
        process.env.secretKey,
        {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        }
      );

      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log("user", JSON.stringify(user, null, 2));
      console.log(token);
      //send users details
      return res.status(201).send(user);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
  }
};

//login authentication

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find a user by their email
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    //if user email is found, compare password with bcrypt
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      //if password is the same
      //generate token with the user's id and the secretKey in the env file

      if (isSame) {
        let token = jwt.sign(
          { id: user.id, type: user.type },
          process.env.secretKey,
          {
            expiresIn: 1 * 24 * 60 * 60 * 1000,
          }
        );

        //if password matches wit the one in the database
        //go ahead and generate a cookie for the user
        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        console.log("login endpoint: user", JSON.stringify(user, null, 2));
        console.log("login endpoint:", token);

        // Track log in time
        if (user.type === "user") {
          const userusage = await UserUsage.findOne({
            where: { userId: user.id },
          });

          await userusage.update({ loginTime: Date.now() });
        }

        //send user data
        return res.status(201).send({ user, token });
      } else {
        return res.status(401).send("Authentication failed");
      }
    } else {
      return res.status(401).send("Authentication failed");
    }
  } catch (error) {
    console.log(error);
  }
};

const checkLogin = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.secretKey);
    const user = await User.findOne({
      where: {
        id: decoded.id,
      },
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.secretKey);
    if (decoded.type == "admin") {
      const users = await User.findAll({
        where: { type: "user" },
      });
      res.status(200).json(users);
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const getUserUsage = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.secretKey);
    const { userId } = req.params;

    if (decoded.type == "admin") {
      const userusage = await UserUsage.findOne({
        where: { userId: userId },
      });

      res.status(200).json(userusage);
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = {
  signin,
  login,
  checkLogin,
  getAllUsers,
  getUserUsage,
};
