const {body} = require('express-validator');

const monthlyPlanValidator = [
    body('name').notEmpty().withMessage('Name is required').isLength({min: 5}).withMessage('Must be at least 5 characters'),
    body('price').notEmpty().withMessage('Price is required').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('availableDays').notEmpty().withMessage('Available Days is required').isInt({ gt: 0 }).withMessage('Available Days must be a positive integer')
]

module.exports = monthlyPlanValidator;