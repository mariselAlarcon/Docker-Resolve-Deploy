const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.get('/facebook', authController.facebookAuth);

router.get('/facebook/callback', authController.facebookCallback, authController.facebookRedirect);

module.exports = router;