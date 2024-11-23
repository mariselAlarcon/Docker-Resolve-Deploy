const {body} = require('express-validator');
const path = require ('path');

const progressValidation = [
    body('name').trim().notEmpty().withMessage('Name is required.').isLength({min: 5}).withMessage('Must be at least 5 characters'),
    
    /*body('images').isArray({min: 1,max: 4}).withMessage('Images must be an array with at least one exercise'),
    body('images*').custom((value, { req }) => {

      if(!req.file){
        throw new Error('Image is required');
      }

      const allowedExtensions = ['.jpg', '.jpeg', '.png'];
      const fileExtension = path.extname(req.file.originalname).toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
          throw new Error('Extension is invalid. Available extensions: jpg, jpeg, png.');
      }

      if(req.file.size > 4 * 1024 * 1024){
        throw new Error('Image size exceeds limit of 10MB'); 
      }
        return true;
      }),
      */
    body('date').isISO8601().withMessage('Date must be a valid date format (YYYY-MM-DD)'),
]

module.exports = progressValidation;