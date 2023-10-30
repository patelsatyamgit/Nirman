const mongoose=require("mongoose");

const dmateInfoSchema=new mongoose.Schema({
    panNumber:{
        type:Number,
        trim:true,
    },
    image:{
        type:String,
        trim:true,
    },
    panImage:{
        type:String,
        trim:true,
    },
    accNumber:{
        type:Number,
        trim:true,
    },
    profession:{
        type:String,
        trim:true,
    }
})

module.exports= mongoose.model("DmateInfo",dmateInfoSchema);