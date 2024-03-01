const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is require']
    },
    email:{
        type:String,
        required:[true,'Email is required and must be unique'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password is required'],

    }
},{timeseries:true})


const userModel = mongoose.model('users',userSchema)

module.exports = userModel