const mongoose = require('mongoose');
const {Schema} = mongoose;

const feedbackSchema = new Schema({
    body:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    score:{
        type: Number,
        required: true
    },
    member:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Member',
        required: true
    }
}, { collection: 'feedbacks'});

module.exports = mongoose.model('Feedback', feedbackSchema);