const {body} = require('express-validator');
const path = require('path');
const Member = require('../database/models/Member');
const mongoose = require('mongoose');

const isValidObjectId = (value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid ObjectId');
    }
    return true;
};

const feedbackValidation = [
    body('body').trim().notEmpty().withMessage('Body is required'),
    body('date').isISO8601().notEmpty().withMessage('Date must be a valid date format (YYYY-MM-DD)'),
    body('score').trim().notEmpty().withMessage('Score of ad is required'),
    body('member').trim().notEmpty().withMessage('Member is required').custom(isValidObjectId).custom(
        async (value) => {
            const existMember = await Member.findById(value);
            if (!existMember) {
                throw new Error('Member invalid');
            }
            return true;
        }
    )
]

module.exports = feedbackValidation;