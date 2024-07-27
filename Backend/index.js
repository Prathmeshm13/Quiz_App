const mongoose = require("mongoose");
const express = require("express");
const app = express();
const userRoute = require("./routes/user");
const quizRoute = require("./routes/quiz");
const { User } = require("./models/user");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = 8000;
const { restricttousers } = require("./middlewares/auth");
const { Quiz } = require("./models/quiz");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};

app.use(cors(corsOptions));

mongoose.connect('mongodb://127.0.0.1:27017/Quiz_App')
    .then(() => console.log('Mongo Connected'))
    .catch(err => console.error('Mongo Connection Error:', err));

app.use("/user", userRoute);
app.use("/quiz", quizRoute);

app.get('/api/check-user', async (req, res) => {
    const email = req.query.email;
    console.log(email);
    try {
        const user = await User.findOne({ email });
        if (user) {
            res.json({ exists: true,
                user:user
             });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        console.error('Error checking user existence:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/allquizes',async(req,res)=>{
    const quizes= await Quiz.find({});
    JSON.stringify(quizes);
    res.json(quizes);
})
app.get('/allscores', async (req, res) => {
    try {
        const users = await User.find({});
        let scores = {};

        users.forEach(user => {
            const totalScores = user.quizesAttempted.reduce((total, quiz) => total + quiz.score, 0);
            const averageScore = user.quizesAttempted.length ? totalScores / user.quizesAttempted.length : 0;
            
            scores[user.fullName] = averageScore;
        });

        res.json(scores);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log("Server started");
});
