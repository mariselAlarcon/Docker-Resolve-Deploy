const mongoose = require('mongoose');
const {Schema} = mongoose;

const muscleGroupSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    img: {
        data: Buffer,
        contentType: String
    }
}, { collection: 'muscle_groups'});

module.exports = mongoose.model('MuscleGroup', muscleGroupSchema);