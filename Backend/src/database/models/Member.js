const mongoose = require('mongoose');
const User = require('../models/User')
const {Schema} = mongoose;

const memberSchema = new Schema({
    state:{
        type: String,
        required: true
    },
    routines:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Routine'
    }],
    progress:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Progress'
    }],
    mounthlyPlan:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'MonthlyPlan',
        required: true
    },
    weeklyGoal:{
        type: Number
    }
}, { collection: 'members'});

module.exports = User.discriminator('Member', memberSchema);