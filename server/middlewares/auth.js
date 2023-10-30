const jwt=require("jsonwebtoken");
require("dotenv").config();
// auth 

exports.auth =async (req,res,next) =>{

    try {
        const token =req.cookies.token
                   || req.body.token 
                   || req.header("Authorization").replace("Bearer ","");

        // if token missing ,then return response 

        if(!token){
            return res.this.status(401).json({
                success:false,
                message:"Token Missing"
            })
        }

        // veryfy token 

        try {

            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user=decode;
            
        } catch (err) {
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            })
            
        }
        next();
        
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating"
        })
    }
}
