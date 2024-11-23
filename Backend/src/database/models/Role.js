const mongoose = require('mongoose');
const {Schema} = mongoose;

const roleSchema = new Schema({
    name:{
        type: String,
        required: true
    }
}, { collection: 'roles'});

module.exports = mongoose.model('Role', roleSchema);