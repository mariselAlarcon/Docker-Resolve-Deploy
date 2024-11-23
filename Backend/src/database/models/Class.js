const mongoose = require('mongoose');
const {Schema} = mongoose;

const classSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    schedule:{
        type: String,
        required: true
    }
}, { collection: 'classes'});

module.exports = mongoose.model('Class', classSchema);