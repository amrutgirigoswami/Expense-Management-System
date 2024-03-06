const mongoose = require('mongoose');

const transectionSchema = new mongoose.Schema({
    user_id: {
        type: String,
        require: [true, 'user ID is required']
    },
    amount: {
        type: Number,
        require: [true, 'amount is required']
    },
    type: {
        type: String,
        require: [true, 'type is required']
    },
    category: {
        type: String,
        require: [true, 'category is required']
    },
    refrence: {
        type: String
    },
    description: {
        type: String,
        require: [true, 'description is require']
    },
    date: {
        type: Date,
        require: [true, 'date is require']
    }
}, { timestamps: true });


const transectionModel = mongoose.model('transections', transectionSchema)

module.exports = transectionModel;