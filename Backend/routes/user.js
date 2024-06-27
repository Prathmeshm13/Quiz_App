const express=require("express");
const mongoose=require("mongoose")
const { User } = require("../models/user");
const router=express.Router();

router.post("/signup",async (req,res)=>{
    const {name,email,username,password,instituteName,passingYear}=req.body;
    console.log(req.body);
    const user= await User.create(
        {
            fullName:name,
            email:email,
            username:username,
            password:password,
            instituteName: instituteName,
            passingYear: passingYear
        },
    )
    res.status(201);
    res.end();
})
module.exports=router;