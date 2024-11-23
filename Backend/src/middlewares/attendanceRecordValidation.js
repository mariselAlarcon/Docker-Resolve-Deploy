const {body} = require('express-validator');
const mongoose = require('mongoose');
const Member = require('../database/models/Member');
const AttendanceRecord = require('../database/models/AttendanceRecord');

const isValidObjectId = (value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid ObjectId');
    }
    return true;
};

const AttendanceRecordValidation = [
    body('date').isISO8601().notEmpty().withMessage('Date must be a valid date format (YYYY-MM-DD)'),
    body('member').trim().notEmpty().withMessage('Member is required').custom(isValidObjectId).custom(
        async (value, { req }) => { 
            const exist = await Member.findById(value);
            if (!exist) {
            throw new Error('Role invalid');
            }

            const attendanceRecord = await AttendanceRecord.findOne({
                member: value,
                date: req.body.date
            });

            if (attendanceRecord) {
                throw new Error('Member already registered for this date');
            }

            return true;
        }
    )
]

module.exports = AttendanceRecordValidation;