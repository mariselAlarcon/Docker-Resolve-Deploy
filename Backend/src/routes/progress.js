const express = require('express');
const progressController = require('../controller/progressController');
const upload = require('../middlewares/multer');
const progressValidation = require('../middlewares/progressValidation');
const router = express.Router();

router.get('/', progressController.list);
router.get('/:id', progressController.getById);
router.post('/add',upload.array('images', 4),progressValidation, progressController.add);
router.delete('/:id', progressController.delete);
router.put('/edit/:id',upload.array('images', 4),progressValidation, progressController.update);

module.exports = router;