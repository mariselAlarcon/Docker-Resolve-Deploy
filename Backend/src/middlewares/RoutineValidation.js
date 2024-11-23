const {body} = require('express-validator');
const Exercise = require('../database/models/Exercise');
const MuscleGroup = require('../database/models/MuscleGroup');
const mongoose = require('mongoose');

const isValidObjectId = (value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid ObjectId');
    }
    return true;
};

const routineValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('exercises').isArray({min: 1}).withMessage('Exercises must be an array with at least one exercise'),
    body('exercises.*').custom(isValidObjectId).bail().custom(async (value) => {
        const existExercise = await Exercise.findById(value);

        if(!existExercise){
            throw new Error(`Excercise ${value} not found`)
        }

        return true
    }),
    body('muscleGroupsSelected').isArray({min: 1}).withMessage('Muscle Groups Selected must be an array with at least one mucles group'),
    body('muscleGroupsSelected.*').custom(isValidObjectId).bail().custom(async (value) => {
        const existMuscleGroup = await MuscleGroup.findById(value);

        if(!existMuscleGroup){
            throw new Error(`Muscle Group ${value} not found`)
        }

        return true
    }),
    body('releaseDate').isISO8601().withMessage('Release Date must be a valid date format (YYYY-MM-DD)'),
]

module.exports = routineValidator;