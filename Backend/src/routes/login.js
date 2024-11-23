const express = require('express');
const loginValidator = require('../middlewares/loginValidation');
const loginController = require('../controller/loginController');
const router = express.Router();

router.post('/', loginValidator, loginController.login);

module.exports = router;