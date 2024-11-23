const mongoose = require('mongoose');
const {Schema} = mongoose;

const attendanceRecordSchema = new Schema({
    date:{
        type: Date,
        required: true
    },
    member:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Member',
        required: true
    }
}, { collection: 'attendance_records'});

module.exports = mongoose.model('AttendanceRecord', attendanceRecordSchema);