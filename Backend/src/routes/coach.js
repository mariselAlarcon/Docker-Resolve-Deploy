const express = require('express');
const coachController = require('../controller/coachController');
const upload = require('../middlewares/multer');
const coachValidation = require('../middlewares/coachValidation');
const router = express.Router();

router.get('/', coachController.list);
router.get('/:id', coachController.getById);
router.post('/add', upload.single('img'), coachValidation, coachController.add);
router.delete('/:id', coachController.delete);
router.put('/edit/:id', upload.single('img'), coachValidation, coachController.update);

module.exports = router;