const path =require('path');
const Users=require('../models/users');
const bcrypt=require('bcrypt');
const e = require('express');
const jwt = require('jsonwebtoken');

const getLoginPage=(req,res,next)=>{
    res.sendFile(path.resolve('public/views/loginpage.html'));
}

const signup=async(req,res,next)=>{
    
    const {name,phone,email,password}=req.body
    try {
        const user= await Users.findAll({where:{email:email}});

        if(user.length===0){

            const userPhone= await Users.findAll({where:{phone:phone}});

            if(userPhone.length===0){

                const hashedPassword= await bcrypt.hash(password,10);

                await Users.create({
                    name:name,
                    email:email,
                    phone:phone,
                    password:hashedPassword
                });

                return res.status(201).json({message:"User Created Successfully"});
                
            }
            else{
                return res.status(409).json({message:"Two users cannot have same Phone number"})
            }

        }
        else{
            return res.status(409).json({message:"User Already Exists"})
        }

    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error Ooccurred"})
    }

}


const login=async(req,res,next)=>{
    
    const {email,password}= req.body;
     try {
        const user= await Users.findOne({where:{email:email}});
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(err){
                    res.status(500).json(error)
                }
                if(result){
                    res.status(200).json({message:"Logged in Successfully",token:generateJWTid({id:user.id}),username:user.name})
                }
                else{
                    res.status(400).json({message:"Incorrect Password"})
                }
            })


        }
        else{
            res.status(404).json({message:"User Not Found"})
        } 
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
    }

}

const generateJWTid=(obj)=>{
    
    return jwt.sign(obj,process.env.JWT_SECRET_KEY);

}

module.exports={
    login,
    signup,
    getLoginPage
}
