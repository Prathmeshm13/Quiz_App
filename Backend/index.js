const mongoose=require("mongoose");
const express=require("express");
const app=express();
const userRoute=require("./routes/user")
const cors=require("cors")
const PORT=8000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
mongoose.connect('mongodb://127.0.0.1:27017/Quiz_App')
    .then(() => console.log('Mongo Connected'))
    .catch(err => console.error('Mongo Connection Error:', err));

app.use("/user",userRoute)
app.listen(PORT,()=>{
        console.log("Server started");
})
    