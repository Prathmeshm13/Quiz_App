const express=require("express");
const mongoose=require("mongoose")
const { User } = require("../models/user");
const router=express.Router();

router.post("/signup",async (req,res)=>{
    const {fullName,email,password,instituteName}=req.body;
    const user= await User.create(
        {
            fullName:fullName,
            email:email,
            password:password,
            instituteName: instituteName,
            passingYear: passingYear
        },
    )
    res.status(201);
    res.end();
})
module.exports=router;