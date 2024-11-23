const {body} = require('express-validator');
const Member = require('../database/models/Member');
const mongoose = require('mongoose');

const isValidObjectId = (value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid ObjectId');
    }
    return true;
};

const monthlyFeeValidator = [
    body('amount').notEmpty().withMessage('Price is required').isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
    body('dueDate').isISO8601().withMessage('Due date must be a valid date format (YYYY-MM-DD)'),
    body('member').trim().notEmpty().withMessage('Member is required').custom(isValidObjectId).bail()
    .custom(async (value) => {
        const existRole = await Member.findById(value);
        if (!existRole) {
        throw new Error('Role invalid');
        }
        return true;
    }),
]

module.exports = monthlyFeeValidator;