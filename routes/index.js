const express = require('express');
const router  = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");

/* GET home page */
router.get('/', (req, res, next) => {
  User.find()
  .then(user =>{
    res.render('index', {user: user})
  })
  .catch(err =>{
    console.log(err)
  })
});


/******************************
 **** get MENU *****/
router.get('/menu', (req, res) => {
  Product.find()
    .then(products => {
      res.render('menu', {products});
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
