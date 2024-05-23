const path = require('path')

function sendChatPage(req,res,next){
    return res.sendFile(path.resolve('public/views/chatMainPage.html'));
}


module.exports={
    sendChatPage,
}