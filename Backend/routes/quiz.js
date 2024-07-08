const express=require("express");
const mongoose=require("mongoose")
const { Quiz } = require("../models/quiz");
const router=express.Router();
const { restricttousers }=require("../middlewares/auth")
router.post("/createquiz", async (req,res)=>{
    let{quizName,
    quizType,
    genre,
    quizDate,
    quizDuration,
    numQuestions,
    scoreCorrect,
    scoreIncorrect,
    ques}=req.body;
    const quiz= await Quiz.create(
        {
            quizName: quizName,
            quizType:quizType,
            genre:genre,
            quizDate:quizDate,
            quizDuration:quizDuration,
            numQuestions:numQuestions,
            scoreCorrect,scoreCorrect,
            scoreIncorrect:scoreIncorrect,
            questions:ques
        },
    )
    res.status(201);
    res.end();
})
module.exports=router;
