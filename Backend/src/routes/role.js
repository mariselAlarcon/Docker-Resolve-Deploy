const express = require('express');
const roleController = require('../controller/roleController');
const router = express.Router();

router.get('/', roleController.list);
router.get('/:id', roleController.getById);

module.exports = router;