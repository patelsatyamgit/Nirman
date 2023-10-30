const Otp = require("../model/Otp");
const User = require("../model/User");
const otpgenerator=require("otp-generator");
const bcrypt =require("bcrypt");
const DmateInfo = require("../model/DmateInfo");
const jwt =require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const { useOutlet } = require("react-router-dom");



require("dotenv").config();

exports.sendOtp=async(req,res)=>{
    try {

        const {Email}= req.body;

        // console.log("email----------------",Email);
        // check if email already exist 
        
        const checkEmail=await User.findOne({Email});

        if(checkEmail){
            return res.status(409).json({
                success:false,
                message:"User already registered",
            })
        }

        // otp otpgenerate 

        var otp=otpgenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });

        const otpPayload={Email,otp};


        const otpbody= await Otp.create(otpPayload);

        res.status(200).json({
            success:true,
            message:"OTP sent successfully",
            otp
        })

        
    } catch (error) {
        // console.log(error);
        res.status(200).json({
            success:false,
            message:"Error in otp sent",
        })
        
    }
}

exports.signUp = async (req,res)=>{
    try {
        const {
            Name,
            Email,
            Password,
            ConfirmPass,
            Mobile,
            refid,
            otp,
        }=req.body;

        // validation 
        //  console.log("----------------------",refid)
        if(!Name || !Email || !Password || !ConfirmPass || !Mobile ){
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            })
        }

        // Password Match 

        if(Password !== ConfirmPass){
              return res.status(400).json({
                success:false,
                message:"Password and ConfirmPass does not match"
              })
        }

        //check if existing user 

        const existingUser =await User.findOne({Email});

        if(existingUser){
            return res.status(409).json({
                success:false,
                message:"User is already registered",
            })
        }

        const  recentOtp= await Otp.find({Email}).sort({createdAt:-1}).limit(1);

        if(recentOtp.length==0){
            return res.status(400).json({
                success:false,
                message:"Otp not found"
            })
        }
        else if(otp !== recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"Otp not matching",
            })
        }

        const hashedPassword=await bcrypt.hash(Password,10);


        const dmateDetails=await DmateInfo.create({
            panNumber:null,
            image:null,
            panImage:null,
            profession:null,
        })

        const user= await User.create({
            Name:Name,
            Email:Email,
            password:hashedPassword,
            PhoneNumber:Mobile,
            accountType:"User",
            dmateInfo:dmateDetails._id,
            referal: refid,
            status:"Draft"
        })

        if(refid){
            // console.log("--------------")
            const _id=new mongoose.Types.ObjectId(refid);
            const userOwner=await User.findByIdAndUpdate(_id,{
                $push:{
                    reffers:user._id,
                }
            },{new:true});
            // console.log("user-----------",userOwner);
            await userOwner.save();
        }

        return res.status(200).json({
            success:true,
            message:"User is Registered Successfully",
            user
        })


    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            success:false,
            message:"There is some error in signup",
        })
        
    }
}

exports.login =async (req,res)=>{
    try {
        const {email,Password}=req.body;

        if(!email || !Password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const user= await User.findOne({Email:email}).populate("dmateInfo");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered please signUp to continue",
            });
        }

        if(await bcrypt.compare(Password,user.password)){
            // console.log("inside compire");
            const payload={
                email:user.Email,
                id:user._id,
                role:user.accountType,

            }

            const token= jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"72h"
            })

            user.token=token;
            user.password=undefined;


            // create cookie 

            const option ={
                expires:new Date(Date.now() + 3 * 24 * 60 * 60 *1000),
                httpOnly:true,
            }

            res.cookie("token",token,option).status(200).json({
                success:true,
                token,
                user,
                message:"user Loging successfull"
            })
        }
        else {
            return res.status(401).json({
                success:false,
                message:"Password incorrect",
            })
        }
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            success:true,
            message:"Login Failure , please try again"
        })
    }
}