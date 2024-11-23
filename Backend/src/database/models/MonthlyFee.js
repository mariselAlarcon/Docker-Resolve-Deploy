const mongoose = require('mongoose');
const {Schema} = mongoose;

const monthlyFeeSchema = new Schema({
    dueDate:{
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    member:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Member',
        required: true
    }
}, { collection: 'monthly_fees'});

module.exports = mongoose.model('MonthlyFee', monthlyFeeSchema);