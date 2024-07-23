const express = require("express");
const mongoose = require("mongoose");
const { Quiz } = require("../models/quiz");
const router = express.Router();
const { restricttousers } = require("../middlewares/auth");
const { User } = require("../models/user");
const quiz = require("../models/quiz");

router.post("/createquiz", async (req, res) => {
    console.log("hi");

    try {
        const {
            quizName,
            quizType,
            genre,
            quizDate,
            quizDuration,
            numQuestions,
            scoreCorrect,
            scoreIncorrect,
            ques
        } = req.body;

        console.log("Received data:", req.body); // Debug log

        const quiz = await Quiz.create({
            quizName,
            quizType,
            genre,
            quizDate,
            quizDuration,
            numQuestions,
            scoreCorrect,
            scoreIncorrect,
            questions: ques
        });

        res.status(201).json({ message: 'Quiz created successfully' });
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// app.get('/api/check-user', async (req, res) => {
//     const email = req.query.email;
//     console.log(email);
//     try {
//         const user = await User.findOne({ email });
//         if (user) {
//             res.json({ exists: true });
//         } else {
//             res.json({ exists: false });
//         }
//     } catch (error) {
//         console.error('Error checking user existence:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

router.post("/register", async (req, res) => {
    const email = req.query.email;
    const quizID = req.query.quizId;

    try {
        let qq = await User.findOne({email:email});
        if (!qq) {
            return res.status(404).send({ message: "User not found" });
        }
        let allregquizes = qq.quizesRegistered;
        if (!allregquizes.includes(quizID)) {
            allregquizes.push(quizID);
        }
        console.log(quizID);
        await User.findOneAndUpdate({email:email}, { quizesRegistered: allregquizes });

        res.status(200).send({ message: "Quiz registered successfully" });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send({ message: "Internal server error" });
    }
});
router.post("/finish",async(req,res)=>{
    console.log("Received data:", req.body)
    try {
        let qq = await User.findOne({email:req.body.email});
        if (!qq) {
            return res.status(404).send({ message: "User not found" });
        }
        let allquizes = qq.quizesAttempted;
        // if (!allquizes.some(obj=>obj.hasOwnProperty(req.body.quizId))) {
        //     allquizes.push(req.body);
        // }
        allquizes.push(req.body);
        console.log(allquizes);
        await User.findOneAndUpdate({email:req.body.email}, {quizesAttempted:allquizes});

        res.status(200).send({ message: "Quiz registered successfully" });
    } catch (error) {
        console.error('Error updating score:', error);
        res.status(500).send({ message: "Internal server error" });
    }
})
module.exports = router;
