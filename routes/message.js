const express = require('express');
const User =  require('../models/user');
const check_auth = require("../middleware/check-auth");

const router = express.Router();

const MessageController = require('../controllers/message');

router.post("/generate", check_auth, MessageController.generateMessage);
router.post("/",check_auth,MessageController.createMessage);

module.exports =  router;