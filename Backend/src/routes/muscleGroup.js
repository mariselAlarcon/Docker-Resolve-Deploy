const express = require('express');
const muscleGroupController = require('../controller/muscleGroupController');
const upload = require('../middlewares/multer');
const router = express.Router();

router.get('/', muscleGroupController.list);
router.post('/add',upload.single('img'), muscleGroupController.add);
router.get('/:id', muscleGroupController.getById);

module.exports = router;