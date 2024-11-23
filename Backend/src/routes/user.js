const express = require('express');
const {userController} = require('../controller/userController');
const upload = require('../middlewares/multer');
const userValidation = require('../middlewares/userValidation');
//const imagesValidator = require('../middlewares/imagesValidator');
const router = express.Router();

router.get('/', userController.list);
router.get('/:id', userController.getById);
router.post('/add',upload.single('img'),userValidation, userController.add);
router.delete('/:id', userController.delete);
router.put('/edit/:id',upload.single('img'),userValidation, userController.update);

module.exports = router;