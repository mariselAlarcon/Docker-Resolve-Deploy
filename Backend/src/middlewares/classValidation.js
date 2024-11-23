const {body} = require('express-validator');

const classValidator = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('schedule').trim().notEmpty().withMessage('Schedule is required')
]

module.exports = classValidator;