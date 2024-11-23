const express = require('express');
const attendanceRecordController = require('../controller/attendanceRecordController');
const attendanceRecordValidation = require('../middlewares/attendanceRecordValidation');
const router = express.Router();

router.get('/', attendanceRecordController.list);
router.get('/:id', attendanceRecordController.getById);
router.get('/member/:member', attendanceRecordController.getByMember);
router.get('/attendance/:memberId/:year/:month', attendanceRecordController.findByMemberAndMonth);
router.post('/add', attendanceRecordValidation, attendanceRecordController.add);
router.delete('/:id', attendanceRecordController.delete);
router.put('/edit/:id', attendanceRecordValidation, attendanceRecordController.update);

module.exports = router;
