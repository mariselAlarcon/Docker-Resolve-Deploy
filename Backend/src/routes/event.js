const express = require('express');
const eventController = require('../controller/eventController');
const eventValidation = require('../middlewares/eventValidation');
const router = express.Router();

router.get('/', eventController.list);
router.get('/:id', eventController.getById);
router.post('/add', eventValidation, eventController.add);
router.delete('/:id', eventController.delete);
router.put('/edit/:id', eventValidation, eventController.update);

module.exports = router;