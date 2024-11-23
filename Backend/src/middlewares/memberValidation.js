const {body} = require('express-validator');
const path = require('path');
const Member = require('../database/models/Member');

const isValidObjectId = (value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid ObjectId');
    }
    return true;
};

const memberValidation = [
   // body('state').trim().notEmpty().withMessage('State is required'),
   // body('routines').isArray({min: 1}).withMessage('At least one routine is required')
   // .custom(routines => routines.every(isValidObjectId)).withMessage('Invalid routine ID'),
   // body('progress').isArray({min: 1}).withMessage('At least one routine is required')
   // .custom(progress => progress.every(isValidObjectId)).withMessage('Invalid progress ID'),
   // body('mounthlyPlan').trim().notEmpty().withMessage('Mounthly plan is required').custom(isValidObjectId).withMessage('Invalid monthly plan ID')
]

module.exports = memberValidation;