const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

const ensureLogin = require("connect-ensure-login");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

/********************
 **** get LOGIN *****/ 
router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/auth/private",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));


/********************
 **** get SIGNUP *****/ 
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

/********************
 **** post SIGNUP *****/ 
router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser.save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      res.render("auth/signup", { message: "Something went wrong" });
    })
  });
});


/********************
 **** get PRIVATE *****/ 
router.get("/private", ensureLogin.ensureLoggedIn("/auth/login"), (req, res) => {
    res.render("private", { user: req.user })
});

/********************
 **** get LOGOUT *****/ 
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
