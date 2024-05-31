const fs = require('fs');
const {uploadtoAWS}=require('../services/uploadToS3');
const {storeMessage}=require('./messageController');

async function upload(req,res,next){
    const fileName = req.file.filename;
    const data = fs.readFileSync(req.file.path);
    const {Location} = await uploadtoAWS(fileName,data);
    console.log(Location);
    try {
        await storeMessage(req.user,Location,req.body.groupId,true);

        const response={
            groupId:req.body.groupId,
            isURL:true,
            message:Location,
            name:req.user.name,
            token:req.body.token
        }
    
        req.io.emit('receivedMessage',response);
        
    } catch (error) {
        console.log(error);
        io.emit('errorResponse',"Image Error")

        
    }



    

    

}

module.exports=upload;