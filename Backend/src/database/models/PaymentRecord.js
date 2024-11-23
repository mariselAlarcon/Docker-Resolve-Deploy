const mongoose = require('mongoose');
const {Schema} = mongoose;

const paymentRecordSchema = new Schema({
    releaseDate:{
        type: Date,
        required: true
    },
    fee:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'MounthlyFee',
        required: true
    }
}, { collection: 'payment_records'});

module.exports = mongoose.model('PaymentRecord', paymentRecordSchema);