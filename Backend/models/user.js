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
    instituteName:{
        type:String
    },
    passingYear:{
        type:String
    },
    quizesAttempted:{
        type:Array
    },
    quizesRegistered:{
        type:Array
    }
},{timestamps:true});

const User=mongoose.model("user",userSchema);
module.exports={
    User
}