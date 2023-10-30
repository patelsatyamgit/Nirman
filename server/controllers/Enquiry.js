const Enquiries = require("../model/Enquiries");
exports.createEnquiry = async (req,res)=>{
    try {

        const {Name,MobileNumber,EmailId,Enquiry}=req.body;

        // validation 
        if(!Name || !MobileNumber || !EmailId || !Enquiry){
            return res.status(407).json({
                success:false,
                message:"All the fields are required",
            })
        }

        const enquiry=await Enquiries.create({
            Name:Name,
            mobileNumber:MobileNumber,
            EmailID:EmailId,
            Enquiry:Enquiry,
            status:"Draft"
        })

        return res.status(200).json({
            success:true,
            message:"Enquiry created successfully",
            enquiry
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"There is something error"
        })
        
    }
}

exports.updateEnquiry=async(req,res)=>{
    try {

        const {id}=req.body;

        if(!id){
            console.log("id required");
            return;
        }

        const enquiry=await Enquiries.findOne({_id:id});

        if(!enquiry){
            return res.status(404).json({
                success:false,
                message:"This enquiry is already deleted",
            })
        }

        enquiry.status="Resolved";

        enquiry.save();
        return res.status(200).json({
            success:true,
            message:"Enquiry Resolved",
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"There is something error in enquiry updation"
        })
        
    }
}

exports.getEnquries= async(req,res)=>{
    try {
        const enquries=await Enquiries.find({}).sort({createdAt:-1});

        if(!enquries){
            return res.status(405).json({
                success:false,
                message:"NO data found",
            })
        }
        return res.status(200).json({
            success:true,
            message:"Data fetched successfully",
            enquries
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Data fetch error",
        })
        
    }
}