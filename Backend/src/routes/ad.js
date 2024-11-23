const express = require('express');
const adController = require('../controller/adController');
const upload = require('../middlewares/multer');
const adValidation = require('../middlewares/adValidation');
const router = express.Router();

router.get('/', adController.list);
router.get('/:id', adController.getById);
router.post('/add', upload.single('img'), adValidation, adController.add);
router.delete('/:id', adController.delete);
router.put('/edit/:id', upload.single('img'), adValidation, adController.update);

module.exports = router;

