const express = require('express');
const router = express.Router();
const shareController = require('../controller/shareController');

router.get('/', shareController.shareOnFacebook);

module.exports = router;