const Groups= require('../models/groups');
const Users= require('../models/users');
const messages = require('../models/messages');
const Members= require('../models/members');
const {Op, where}=require('sequelize');


async function creategroup(req,res,next){
    const {user}=req;
    const {groupName,members}=req.body;
    try {

        const group = await Groups.create({
            groupName:groupName
        })

        const groupId= group.dataValues.id;

        let users=await Users.findAll({
            where:{
                email:{
                    [Op.in]:members
                }
            }
        })

        users = users.filter(element=>element.dataValues.email!==user.email);

                // users.forEach(async(element)=>{
        //     let check= await Members.findAll({where:{
        //         userId:element.dataValues.id,
        //         groupId:groupId

        //     }})
        //     if(check.length===0){
        //         await Members.create({
        //             isAdmin:false,
        //             userId:element.dataValues.id,
        //             name:element.dataValues.name,
        //             email:element.dataValues.email,
        //             groupId:groupId,
        //             groupName:groupName
        //         })
        //     }
            
            
        // });

        for(let element of users){
            let check= await Members.findAll({where:{
                userId:element.dataValues.id,
                groupId:groupId

            }})

            if(check.length===0){
                await Members.create({
                    isAdmin:false,
                    userId:element.dataValues.id,
                    name:element.dataValues.name,
                    email:element.dataValues.email,
                    groupId:groupId,
                    groupName:groupName
                })

            }
        }
        await Members.create({
            isAdmin:true,
            userId:req.user.id,
            groupId:groupId,
            name:user.name,
            email:user.email,
            groupName:groupName

        })

    res.status(201).json({groupId:groupId,groupName:groupName})

        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error Occurred"})
        
    }

}


async function addMember(req,res,next){
    const{user}=req;
    const {members,groupId}=req.body;
    try {

        let users=await Users.findAll({
            where:{
                email:{
                    [Op.in]:members
                }
            }
        })

        const groupName=await Groups.findOne({where:{
            id:groupId
        }})
        

        let responseToSend=[];

     /* users.forEach(async(element)=>{
            let check= await Members.findAll({where:{
                userId:element.dataValues.id,
                groupId:groupId

            }})

            if(check.length===0){
                responseToSend.push(element);

                await Members.create({
                    isAdmin:false,
                    userId:element.dataValues.id,
                    name:element.dataValues.name,
                    email:element.dataValues.email,
                    groupId:groupId,
                    groupName:groupName.dataValues.groupName
                })

            }
            
            
        }) */

        for(let element of users ){
            let check= await Members.findAll({where:{
                userId:element.dataValues.id,
                groupId:groupId

            }})

            if(check.length===0){
                responseToSend.push(element);

                await Members.create({
                    isAdmin:false,
                    userId:element.dataValues.id,
                    name:element.dataValues.name,
                    email:element.dataValues.email,
                    groupId:groupId,
                    groupName:groupName.dataValues.groupName
                })

            }

        }

        res.status(201).json(responseToSend)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error Occurred'})
        
    }


}

async function getMembers(req,res,next){
    const {user}=req;
    const groupId= req.params.id;
    try {
        const users= await Members.findAll({
            where:{
                groupId:groupId
            }
        });

        

        for(let element of users){
            if(element.userId===user.id){
                element.dataValues.self=true
            }
            else{
                element.dataValues.self=false;
            }
        }
               

        res.status(200).json(users)
        
    } catch (error) {
        
    }
}

async function getAllGroups(req,res,next){
    const {user}= req;
    try {
        const allGroups= await Members.findAll({where:{userId:user.id}});
        let responseToSend=[];

      allGroups.forEach((element)=>{
            if(element.dataValues.userId==user.id){
                element.dataValues.self=true;
            }
            else{
                element.dataValues.self=false;

            }
            responseToSend.push(element);
            
        });

        

        res.status(200).json(responseToSend);
        
    } catch (error) {

        console.log(error);
        res.status(500).json({message:'Error Occurred'})
        
    }

}

async function deleteMember(req,res,next){
    const {userId,groupId}=req.body

    try {
        console.log(req.body);
        await Members.destroy({
            where:{
                groupId:groupId,
                userId:userId
            }
        })

        res.status(200).json({message:'Deleted'})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error Occurred"})
        
    }
}

async function exitGroup(req,res,next){
    const {user}=req;
    const {groupId}=req.body;
    
    try {
        await Members.destroy({
            where:{
                groupId:groupId,
                userId:user.id
            }
        })

        res.status(200).json({message:"Exited From Group"})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error Occurred"})
    }

}

async function makeAdmin(req,res,next){
    const {userId,groupId}=req.body;
    console.log(userId);
    console.log(groupId);
    try {

        await Members.update({isAdmin:true},
            {where:{
                userId:userId,
                groupId:groupId
            }})

        res.status(200).json({message:'updated'})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error Occurred"})

        
    }

}

async function removeAdmin(req,res,next){
    const {userId,groupId}=req.body;
    console.log(userId);
    console.log(groupId);
    try {

        await Members.update({isAdmin:false},
            {where:{
                userId:userId,
                groupId:groupId
            }})

        res.status(200).json({message:'updated'})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error Occurred"})

        
    }

    
}
module.exports={
    creategroup,
    getMembers,
    addMember,
    getAllGroups,
    deleteMember,
    makeAdmin,
    removeAdmin,
    exitGroup
}
