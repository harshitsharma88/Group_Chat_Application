const jwt = require('jsonwebtoken');
const Users= require('../models/users');

async function authenticate(req,res,next){

    console.log('/////////////---In Auth---////////////////');
    try {

        const token = req.header('authorization')

        console.log('token  --',token);
        
        if(!token){
            return res.status(400).json({message:'Authorization token missing'});
        }

        const jwtObject = jwt.verify(token,process.env.JWT_SECRET_KEY);

        console.log('jwtObject  ---',jwtObject);
        
        const user = await Users.findByPk(jwtObject.id);


        console.log('user  ---',user);

        if(!user){
            return res.status(404).json({message:'User not found'})
        }

        req.user=user;

        next();

        console.log('/////////////---Out Auth---////////////////');


        
        
        
    } catch (error) {

        console.log(error);
        res.status(500).json({message:'Server Error'});


        
    }
}

module.exports=authenticate