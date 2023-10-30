const express= require("express");
const router=express.Router();

const {login,signUp,sendOtp}=require("../controllers/auth");
const {createDemateAccount,getReferDetails}=require("../controllers/user");
const {createEnquiry,updateEnquiry,getEnquries}=require("../controllers/Enquiry");
const {auth} =require("../middlewares/auth");

router.post("/sendOtp",sendOtp);
router.post("/login",login);
router.post("/signUp",signUp)
router.post("/createDemate",auth,createDemateAccount);
router.post("/createEnquiry",createEnquiry);
router.get("/getEnquiry",getEnquries);
router.post("/updateEnquiry",updateEnquiry);
router.get("/getReferD",auth,getReferDetails)

module.exports=router;