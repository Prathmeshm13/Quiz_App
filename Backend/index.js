const mongoose=require("mongoose");
const express=require("express");
const app=express();
const userRoute=require("./routes/user")
const quizRoute=require("./routes/quiz")
const {User} =require("./models/user")
const cors=require("cors");
const cookieParser= require("cookie-parser");
const PORT=8000;
const { restricttousers }=require("./middlewares/auth")
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

app.use("/user",userRoute)
app.use("/quiz",quizRoute)
app.get('/api/check-user', async (req, res) => {
    const email = req.query.email;
    console.log(email);
    try {
      const user = await User.findOne({email});
      if (user) {
        res.json({ exists: true });
      } else {
        res.json({ exists: false });
      }
    } catch (error) {
      console.error('Error checking user existence:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
app.listen(PORT,()=>{
        console.log("Server started");
})
    