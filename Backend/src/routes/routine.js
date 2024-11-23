const express = require('express');
const routineController = require('../controller/routineController');
const routineValidation = require('../middlewares/RoutineValidation');
const router = express.Router();

router.get('/', routineController.list);
router.get('/:id', routineController.getById);
router.post('/add',routineValidation, routineController.add);
router.delete('/:id', routineController.delete);
router.put('/edit/:id',routineValidation, routineController.update);

module.exports = router;