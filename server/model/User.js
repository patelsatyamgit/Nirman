const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        trim:true,
    },
    Email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    PhoneNumber:{
        type:Number,
        required:true,
        trim:true,
    },
    gender:{
        type:String,
        trim:true 
    },
    accountType:{
        type:String,
        enum:["Admin","User"],
        required:true,
    },
    dmateInfo:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"DmateInfo"
    },
    wallet:{
        type:Number,
    },
    reffers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    status:{
        type:String,
        enum:["Draft","Complete"],
    },
    referal:{
        type:String,
        trim:true,
    }


})

module.exports = mongoose.model("User",userSchema);