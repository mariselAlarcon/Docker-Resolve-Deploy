const express = require('express');
const feedbackController = require('../controller/feedbackController');
const feedbackValidation = require('../middlewares/feedbackValidation');
const router = express.Router();

router.get('/', feedbackController.list);
router.get('/:id', feedbackController.getById);
router.post('/add', feedbackValidation, feedbackController.add);
router.delete('/:id', feedbackController.delete);
router.put('/edit/:id', feedbackValidation, feedbackController.update);

module.exports = router;

