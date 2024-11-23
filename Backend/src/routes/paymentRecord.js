const express = require('express');
const paymentRecordController = require('../controller/paymentRecordController');
const router = express.Router();

router.get('/', paymentRecordController.list);
router.get('/:id', paymentRecordController.getById);
router.post('/add', paymentRecordController.add);
router.delete('/:id', paymentRecordController.delete);
router.put('/edit/:id',paymentRecordController.update);

module.exports = router;