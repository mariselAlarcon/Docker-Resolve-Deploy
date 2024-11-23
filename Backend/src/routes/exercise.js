const express = require('express');
const exerciseController = require('../controller/exerciseController');
const upload = require('../middlewares/multer');
const exerciseValidation = require('../middlewares/exerciseValidation');
const router = express.Router();

router.get('/', exerciseController.list);
router.get('/:id', exerciseController.getById);
router.post('/add', upload.single('images'), exerciseValidation, exerciseController.add);
router.delete('/:id', exerciseController.delete);
router.put('/edit/:id', upload.single('images'), exerciseValidation, exerciseController.update);

module.exports = router;

