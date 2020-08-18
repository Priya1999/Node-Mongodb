const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating structure for database
var dataSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    College: {
        type: String,
        required: true,
    },
    Department: {
        type: String,
        required: true,
    },
    Mobile: {
        type: String,
        max: 10,
        required: true,
        unique: true,
    }
}, {
    timestamps: true
});

//creating interface model to database for CRUD operations

var datas = mongoose.model('data', dataSchema);
module.exports = datas;