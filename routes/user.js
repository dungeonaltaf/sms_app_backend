const express = require('express');
const User =  require('../models/user');
const router = express.Router();
const UserController = require('../controllers/user');
var jwt_Secret;

router.post("/signup", UserController.signUp);
// if there is wrong login info this fails!!
router.post("/login",UserController.login);

module.exports =  router;