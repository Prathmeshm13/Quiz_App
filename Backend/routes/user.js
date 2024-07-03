const express=require("express");
const mongoose=require("mongoose")
const { User } = require("../models/user");
const router=express.Router();

router.post("/signup",async (req,res)=>{
    const {name,email,username,password,instituteName,passingYear}=req.body;
    console.log(req.body);
    try {
        const user = await User.create({
            fullName: name,
            email: email,
            username: username,
            password: password,
            instituteName: instituteName,
            passingYear: passingYear,
            scores: [],
        });

        res.status(201).redirect("http://localhost:5173/quiz/create-quiz");
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})
module.exports=router;