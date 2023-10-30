const mongooose=require("mongoose");

const EnquiriesSchema=mongooose.Schema({
    Name:{
        type:String,
        required:true,
        trim:true,
    },
    mobileNumber:{
        type:String,
        required:true,
        trim:true,
    },
    EmailID:{
        type:String,
        required:true,
        trim:true,
    },
    Enquiry:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        enum:["Draft","Resolved"],
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),    
    }

})

module.exports = mongooose.model("Enquiries",EnquiriesSchema);