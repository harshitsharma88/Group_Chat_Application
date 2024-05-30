const Users= require('../models/users');
const messages = require('../models/messages');
const { where } = require('sequelize');

async function storeMessage(user,message,groupId){
    try {
        await messages.create({
            name:user.name,
            message:message,
            userId:user.id,
            groupId:groupId
        })

        return;

    } catch (error) {
        console.log(error);
        throw new Error();
    }

}


async function getMessages(req,res,next){
    const groupId=req.params.groupid
    try {

        const allMessage= await messages.findAll({where:{groupId:groupId}},{order:['id']});

         allMessage.forEach((element)=>{
            if(element.userId===req.user.id){
                element.dataValues.self=true;
            }
            else{
                element.dataValues.self=false;
            }
        })

        return res.status(200).json(allMessage);
        
    } catch (error) {

        console.log(error);
        res.status(500).json({message:'Error Occurred'})
        
    }
}

module.exports={
    storeMessage,
    getMessages,

}