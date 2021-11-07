const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//@route POST /api/users/register
//@desc Register new Users
//@access PUBLIC
router.post("/register", (req, res) => {
  console.log("12344");
  const errors = {};
  console.log(req.body);
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.registered = "User already registered";
      return res.status(400).json({ errors });
    }
    console.log("asdfsdfasdfasdf");
    console.log(req.body.name);
    console.log(req.body.password);
    if (
      req.body.name.length <= 2 ||
      req.body.email.length === 0 ||
      req.body.password.length === 0
    ) {
      errors.empty = "Input field is empty";
      return res.status(400).json(errors);
    }
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    console.log(re.test(req.body.email));
    if (!re.test(req.body.email)) {
      console.log("test not passed");
      errors.email = "email format is not correct";
      return res.status(400).json(errors);
    }
    if (req.body.password.length < 6) {
      errors.password = "Password length must be greater than 6 characters";
      return res.status(400).json(errors);
    }
    const newUser = User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.log(error);
        res.status(400).json(err);
      }
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        console.log("23");
        newUser.password = hash;
        newUser.save().then(() => {
          console.log("user is successfully registered");
          res.json({ user: "User registration is successful" });
        });
      });
    });
  });
});

//@route POST /api/users/login
//@desc Login Users
//@access PUBLIC
router.post("/login", (req, res) => {
  const errors = {};
  console.log(req.body);
  User.findOne({ email: req.body.email }).then((user) => {
    console.log(user);
    if (!user) {
      errors.user = "No User Found with that email";
      return res.status(404).json(errors);
    }
    bcrypt.compare(req.body.password, user.password, (err, match) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      if (!match) {
        errors.password = "Password entered is incorrect";
        return res.status(402).json(errors);
      }
      const payload = { name: user.name, email: user.email };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          res.json({ login: "success", token: `Bearer ${token}` });
        }
      );
    });
  });
});

//@route GET /api/users/test
//@desc test
//@access PRIVATE
router.get(
  "/test",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    res.json("/test");
  }
);

module.exports = router;
