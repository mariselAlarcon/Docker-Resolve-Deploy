const express = require('express');
const classController = require('../controller/classController');
const classValidation = require('../middlewares/classValidation');
const router = express.Router();

router.get('/', classController.list);
router.get('/:id', classController.getById);
router.post('/add', classValidation, classController.add);
router.delete('/:id', classController.delete);
router.put('/edit/:id', classValidation, classController.update);

module.exports = router;

