const express = require('express');
const memberController = require('../controller/memberController');
const upload = require('../middlewares/multer');
const memberValidation = require('../middlewares/memberValidation');
const userValidation = require('../middlewares/userValidation');
const router = express.Router();

router.get('/', memberController.list);
router.get('/activeMembers', memberController.getActiveMembers);
router.get('/progress/:id', memberController.getProgressByMember);
router.get('/routines/:id', memberController.getRoutinesByMember);
router.get('/activeMembers/count', memberController.countActiveMembers);
router.get('/:id', memberController.getById);
router.get('/dni/:dni', memberController.getByDni);
router.post('/add',upload.single('img'),userValidation, memberValidation, memberController.add);
router.delete('/:id', memberController.delete);
router.put('/edit/:id', upload.single('img'),userValidation, memberValidation, memberController.update);
router.put('/edit/routine/:id',memberController.addRoutine);
router.put('/edit/progress/:id',memberController.addProgress);
router.put('/edit/monthlyPlan/:id',memberController.changeMonthlyPlan);

module.exports = router;