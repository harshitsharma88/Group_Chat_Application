const Users= require('../models/users');
const messages = require('../models/messages');
const { where } = require('sequelize');

async function storeMessage(req,res,next){
    try {
        await messages.create({
            name:req.body.name,
            message:req.body.message,
            userId:req.user.id
        })

        return res.status(200).json('succes');

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error Occurred'});
    }

}


async function getMessages(req,res,next){
    try {

        const allMessage= await messages.findAll({order:['id']});

         allMessage.forEach((element)=>{
            if(element.userId===req.user.id){
                element.dataValues.self=true;
            }
            else{
                element.dataValues.self=false;
            }
        })

        console.log(allMessage);

        return res.status(200).json(allMessage);
        
    } catch (error) {

        console.log(error);
        res.status(500).json({message:'Error Occurred'})
        
    }
}


module.exports={
    storeMessage,
    getMessages

}