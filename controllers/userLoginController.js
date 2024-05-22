const path =require('path');

exports.getLoginPage=(req,res,next)=>{
    res.sendFile(path.resolve('public/views/loginpage.html'));
}