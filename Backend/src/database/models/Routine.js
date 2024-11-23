const mongoose = require('mongoose');
const {Schema} = mongoose;

const routineSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    exercises:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Exercise',
        required: true
    }],
    releaseDate: {
        type: Date,
        required: true
    },
    muscleGroupsSelected: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'MuscleGroup',
        required: true
    }],
}, { collection: 'routines'});

module.exports = mongoose.model('Routine', routineSchema);