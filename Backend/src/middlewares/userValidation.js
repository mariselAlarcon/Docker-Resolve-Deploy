const {body} = require('express-validator');
const User = require('../database/models/User');
const Role = require('../database/models/Role');
const path = require ('path');

const userValidation = [
    body('username').trim().notEmpty().withMessage('Username is required.').isLength({min: 5}).withMessage('Must be at least 5 characters').bail()
    .custom(async (value, {req})=> {
      let existUsername;
        if (req.params.id) {
          existUsername = await User.findOne({
            username: value,
            _id: { $ne: req.params.id },
          });
        } else {
          existUsername = await User.findOne({
            username: value,
          });
        }
    
        if (existUsername) {
          throw new Error('Username already in use');
        }
    
        return true;
    }),
    body('password').trim().notEmpty().withMessage('Password is required.').bail().isLength({ min: 8 }).withMessage('Min length 8 characters').bail().matches(/[A-Z]/).withMessage('Must be at least a uppercase').bail().matches(/[a-z]/).withMessage('Must be at least a lowercase').bail().matches(/[0-9]/).withMessage('Must be at least a number'),
    body('email').trim().notEmpty().withMessage('Email is required.').isEmail().withMessage('Email invalid').bail()
    .custom(async (value, {req}) => {
        let existEmail;
      if (req.params.id) {
        existEmail = await User.findOne({
          email: value,
          _id: { $ne: req.params.id },
        });
      } else {
        existEmail = await User.findOne({
          email: value,
        });
      }
  
      if (existEmail) {
        throw new Error('Email already in use');
      }
  
      return true;
  }),
    body('role').trim().notEmpty().withMessage('Role is required').bail()
    .custom(async (value) => {
        const existRole = await Role.findById(value);
        if (!existRole) {
        throw new Error('Role invalid');
        }
        return true;
    }),
    body('personalInformation.firstName').trim().notEmpty().withMessage('Name is required').isLength({ min: 3 }).withMessage('Debe tener minimo 3 caracteres'),
    body('personalInformation.lastName').trim().notEmpty().withMessage('Surname is required').isLength({ min: 3 }).withMessage('Debe tener minimo 3 caracteres'),
    body('personalInformation.dni').trim().notEmpty().withMessage('DNI is required').bail()
    .custom(async (value, {req}) => {
        let existDNI;
        if (req.params.id) {
          existDNI = await User.findOne({
            'personalInformation.dni': value,
            _id: { $ne: req.params.id },
          });
        } else {
          existDNI = await User.findOne({
            'personalInformation.dni': value,
          });
        }
    
        if (existDNI) {
          throw new Error('DNI already in use');
        }
    
        return true;
    }),
    body('personalInformation[address]').trim().notEmpty().withMessage('Address is required'),
    body('personalInformation[phoneNumber]').trim().notEmpty().withMessage('Phone is required'),
    body('personalInformation[dateOfBirth]').trim().notEmpty().withMessage('Date of Birth is required').isISO8601().withMessage('Date of Birth must be a valid date format (YYYY-MM-DD)'),
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

module.exports = userValidation;