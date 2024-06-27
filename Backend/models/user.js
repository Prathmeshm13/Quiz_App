const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    instituteName:{
        type:String
    },
    passingYear:{
        type:String
    },
    quizesAttempted:{
        type:Array
    }
},{timestamps:true});

const User=mongoose.model("user",userSchema);
module.exports={
    User
}