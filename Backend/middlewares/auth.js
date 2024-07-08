const { getUser }=require("../service/auth")

function restricttousers(req,res,next){
    const userUid=req.cookies?.uid;
    console.log(userUid);
    if(!userUid)return res.redirect('http://localhost:5173/login');
    const user=getUser(userUid);
    if(!user)return res.redirect('http://localhost:5173/login');
    req.user=user;
    next();
}

module.exports={
    restricttousers
}