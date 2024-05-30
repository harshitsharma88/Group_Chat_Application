const path = require('path')
const Groups= require('../models/groups');

async function sendChatPage(req,res,next){

     try {
            await Groups.findOrCreate({
                where: {
                    id:1,
                    
                },
                defaults: {
                    id:1,
                    groupName:'GlobalGroup'
                }
                })
            return res.sendFile(path.resolve('public/views/chatMainPage.html'));
            
        } catch (error) {
            console.log(error);
            res.status(500).json("Errorr")
            
        }
    

    
}


module.exports={
    sendChatPage,
}