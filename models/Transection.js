const mongoose = require('mongoose');

const transectionSchema = new mongoose.Schema({
    amount:{
        type:Number,
        require:[true,'amount is required']
    },
    category:{
        type:String,
        require:[true,'category is required']
    },
    refrence:{
        type:String
    },
    description:{
        type:String,
        require:[true,'description is require']
    },
    date:{
        type:String,
        require:[true,'date is require']
    }
},{timestamps:true});


 const transectionModel = mongoose.model('transections',transectionSchema)

 module.exports = transectionModel;