const jwt = require('jsonwebtoken');
const Users= require('../models/users');

async function socketAuthenticate(senderDetails){
    const {token,groupId}=senderDetails;
    try {
       
        if(!token){
            throw new Error('Error');
        }

        const jwtObject= jwt.verify(token,process.env.JWT_SECRET_KEY);

       

        const user = await Users.findByPk(jwtObject.id);

    

        if(!user){
            throw new Error('Error');
        }

        return user

        
    } catch (error) {
        console.log(error);
        throw new Error('Error');
    }
}

module.exports=socketAuthenticate;