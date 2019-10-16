const express = require('express');
const router  = express.Router();
const User = require("../models/User");

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

module.exports = router;
