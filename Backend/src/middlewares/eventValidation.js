const {body} = require('express-validator');


const eventValidation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('date').isISO8601().notEmpty().withMessage('Date must be a valid date format (YYYY-MM-DD)'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('startTime').trim().notEmpty().withMessage('Time is required').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Time must be in HH:MM format'),
    body('finishTime').trim().notEmpty().withMessage('Time is required').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Time must be in HH:MM format')
]

module.exports = eventValidation;