const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Product = require('../models/Product');
const Table = require('../models/Table');
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
  successRedirect: "/auth/create-product",
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
 **** get LOGOUT *****/ 
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});


/*****************************
 **** get CREATE PRODUCT *****/ 
router.get("/create-product", ensureLogin.ensureLoggedIn("/auth/login"), (req, res) => {
  res.render("createProduct", { user: req.user })
});

/******************************
 **** post CREATE PRODUCT *****/
router.post('/create-product', (req, res) => {
  Product.create(req.body)
    .then(() => {
      res.redirect('/menu');
    })
    .catch(err => {
      console.log(err);
    });
});


/************************
 **** get ADD TABLE *****/ 
router.get("/add-table", ensureLogin.ensureLoggedIn("/auth/login"), (req, res) => {
  Table.find()
  .then(tables => {
    res.render("addTable", { tables })
  })
});


/******************************
 **** post ADD TABLE *****/
router.post('/add-table', (req, res) => {
  Table.create(req.body)
    .then(() => {
      res.redirect('/auth/add-table');
    })
    .catch(err => {
      console.log(err);
    });
});



module.exports = router;
