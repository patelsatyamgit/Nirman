const DmateInfo = require("../model/DmateInfo");
const User = require("../model/User");
const otpgenerator=require("otp-generator");

const {uploadFile} = require("../utils/CloudinaryUploader");
const { useId } = require("react");

exports.createDemateAccount= async (req,res)=>{
    try {

        const {panNumber,profession}=req.body;
        const photo=req.files.profilePhoto;
        const panpic=req.files.panPhoto;
        const userid=req.user.id;

        // validate 

        if(!panNumber || !profession || !photo || !panpic){
            return res.status(400).json({
                success:false,
                message:"all the fields are required",
            })
        }


        var accountnumer=otpgenerator.generate(12,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });



        // cloudinory upload 
        
        const profilpic = await uploadFile(photo, process.env.FOLDER_NAME);
        const pancardpic = await uploadFile(panpic, process.env.FOLDER_NAME);
        // cheack if user present or not 

        const user=await User.findOne({_id:userid}).populate('dmateInfo');
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not present",
            })
        }
        const account= await DmateInfo.findOne({_id:user.dmateInfo});
        if(!account){
            return res.status(404).json({
                success:false,
                message:"Dmate account not found",
            })
        }
        account.panNumber=panNumber;
        account.image=profilpic.secure_url;
        account.panImage=pancardpic.secure_url;
        account.profession=profession;
        account.accNumber=accountnumer;

        user.status="Complete";

        await user.save();
        await account.save();

        const  usernewInfo=await User.findOne({_id:userid}).populate('dmateInfo');

        return res.status(200).json({
            success:true,
            message:"Demate account created successfully",
            usernewInfo
        })


        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error"
        })
        
    }
}

exports.getReferDetails = async (req,res)=>{
    try {
        const userid=req.user.id;
        const user=await User.findOne({_id:userid}).populate("reffers");

        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found",
            })
        }
        return res.status(200).json({
            success:true,
            message:"data get successfully",
            user
        })        
    }
     catch (error) {

        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Server error",
        })
        
    }
}