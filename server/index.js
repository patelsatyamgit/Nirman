const express=require("express");

const app=express();
const fileUpload =require("express-fileupload");
const database=require("./config/database");
const {cloudinaryConnect}=require("./config/cloudinary")
const dotenv=require("dotenv");
const cors=require("cors");
const cookieParser =require("cookie-parser");
const userRoutes=require("./routes/user");
dotenv.config();

const PORT = process.env.PORT || 4000;

database.connect();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin:"*",
        credentials:true
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)

//cloudinary connection

cloudinaryConnect()
app.use("/api/v1",userRoutes);

app.listen(PORT,()=>{
    console.log(`app is running at ${PORT}`)
})

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"your server is up and runnig"
    })
})