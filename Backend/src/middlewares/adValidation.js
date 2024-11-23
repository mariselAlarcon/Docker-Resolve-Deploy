const {body} = require('express-validator');
const path = require('path');

const adValidator = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('date').isISO8601().notEmpty().withMessage('Date must be a valid date format (YYYY-MM-DD)'),
    body('body').trim().notEmpty().withMessage('Body of ad is required'),
    body('img').custom((value, { req }) => {

        if(!req.file){
          throw new Error('Image is required');
        }
  
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        const fileExtension = path.extname(req.file.originalname).toLowerCase();
  
        if (!allowedExtensions.includes(fileExtension)) {
            throw new Error('Extension is invalid. Available extensions: jpg, jpeg, png.');
        }
  
        if(req.file.size > 10 * 1024 * 1024){
          throw new Error('Image size exceeds limit of 10MB'); 
        }
          return true;
        })
]

module.exports = adValidator;