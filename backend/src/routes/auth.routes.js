const express=require("express");
const router=express.Router();
const authController=require("../controllers/auth.controller")

//*post /api/auth/register
router.post("/register",authController.registerController);

//*post /api/auth/login
router.post("/login",authController.loginController);


module.exports=router;