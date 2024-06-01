
const archiveMessages=require('../models/archiveMessages');
const {where,Op}=require('sequelize');
const messages = require('../models/messages');

async function archiveAllMessages(){

    const date = new Date();
    date.setDate(date.getDate()-1);
    const allMessages= await messages.findAll({
        where:{
            createdAt:{[Op.lt]:date}
        }
    })

    await archiveMessages.bulkCreate(allMessages.map(msg=>msg.toJSON()));

    console.log('New entries added from message table');

    await messages.destroy({
        where:{
            createdAt:{[Op.lt]:date}
        }
    })

    console.log('Old message copied to archiveModel and delted from source table');

}

module.exports=archiveAllMessages;