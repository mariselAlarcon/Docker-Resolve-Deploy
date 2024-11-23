const express = require('express');
const monthlyPlanController = require('../controller/monthlyPlanController');
const monthlyPlanValidation = require('../middlewares/monthlyPlanValidation');
const router = express.Router();

router.get('/', monthlyPlanController.list);
router.get('/:id', monthlyPlanController.getById);
router.post('/add',monthlyPlanValidation, monthlyPlanController.add);
router.delete('/:id', monthlyPlanController.delete);
router.put('/edit/:id',monthlyPlanValidation, monthlyPlanController.update);

module.exports = router;