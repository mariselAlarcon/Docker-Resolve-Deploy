const {body} = require('express-validator');
const Class = require('../database/models/Class');
const path = require('path');

const isValidObjectId = (value) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error('Invalid ObjectId');
  }
  return true;
};

const coachValidator = [
    body('fullname').trim().notEmpty().withMessage('Fullname is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('workArea').trim().notEmpty().withMessage('WorkArea is required').custom(isValidObjectId).custom(
      async (value) => { 
        const exist = await Class.findById(value);
        if (!exist) {
        throw new Error('Class invalid');
        }
      }
    ),
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),
    body('age').trim().notEmpty().withMessage('Age is required'),
    body('schedule').trim().notEmpty().withMessage('Schedule is required'),
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

module.exports = coachValidator;