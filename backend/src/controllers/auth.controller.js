const User=require("../models/user.model");
const jwt=require("jsonwebtoken");

//user register controller
//- *post /api/auth/register
async function registerController(req,res){
    const {email,name,password}=req.body;

    const isExist=await User.findOne({
        email:email
    });

    if(isExist){
       return  res.status(422).json("email already existed")
    }
    
    const user=await User.create({
        name:name,
        email:email,
        password:password

    });
   console.log(process.env.JWT_SECRET);
    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{
        expiresIn:"3d"    });

    res.cookie("token",token);
    
    res.status(201).json({
        user:{
        _id:user._id,    
        email:user.email,
        name:user.name
        }
    });
};

// login controller
//- /*POST /api/auth/login

async function loginController(req,res) {
    
    const {email,password}=req.body;

    const user=await User.findOne({email:email}).select("+password");

    if(!user){
        return res.status(401).json({
            message:"email or paasword is invalid"
        })
    }
    
    const isValidPassword=await user.comparePassword(password);

    if(!isValidPassword){
         return res.status(401).json({
            message:"email or paasword is invalid"
        })
    }

    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{
     expiresIn:"3d"    });

    res.cookie("token",token);
    
    res.status(200).json({
        user:{
        _id:user._id,    
        email:user.email,
        name:user.name
        }
    });

}









module.exports={
    registerController,
    loginController
}