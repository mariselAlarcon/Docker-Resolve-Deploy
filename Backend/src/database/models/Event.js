const mongoose = require('mongoose');
const {Schema} = mongoose;

const eventSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime:{
        type: Date,
        required: true
    },
    finishTime:{
        type: Date,
        required: true
    }
}, { collection: 'events'});

module.exports = mongoose.model('Event', eventSchema);