const Groups= require('../models/groups');
const Users= require('../models/users');
const messages = require('../models/messages');
const Members= require('../models/members');
const {Op, where}=require('sequelize');
const database= require('../utils/database');


async function creategroup(req,res,next){
    const {user}=req;
    const {groupName,members}=req.body;
    const trn = await database.transaction();
    try {

        const group = Groups.create({
            groupName:groupName
        },{transaction:trn})

        

        let users= Users.findAll({
            where:{
                email:{
                    [Op.in]:members
                }
            }
        },{transaction:trn});

        const all = await Promise.all([group,users])

        const groupId= all[0].dataValues.id;

        users = all[1].filter(element=>element.dataValues.email!==user.email);

        
        for(let element of users){
            let check= await Members.findAll({where:{
                userId:element.dataValues.id,
                groupId:groupId

            }},{transaction:trn})

            if(check.length===0){
                await Members.create({
                    isAdmin:false,
                    userId:element.dataValues.id,
                    name:element.dataValues.name,
                    email:element.dataValues.email,
                    groupId:groupId,
                    groupName:groupName
                },{transaction:trn})

            }
        }
        await Members.create({
            isAdmin:true,
            userId:req.user.id,
            groupId:groupId,
            name:user.name,
            email:user.email,
            groupName:groupName

        },{transaction:trn})

        await trn.commit();

    res.status(201).json({groupId:groupId,groupName:groupName})

        
    } catch (error) {
        console.log(error);
        trn.rollback();
        res.status(500).json({message:"Error Occurred"})
        
    }

}


async function addMember(req,res,next){
    const{user}=req;
    const {members,groupId}=req.body;
    const trn= await database.transaction();
    try {

        let users= Users.findAll({
            where:{
                email:{
                    [Op.in]:members
                }
            }
        },{transaction:trn});

        let groupName= Groups.findOne({where:{
            id:groupId
        }},{transaction:trn});

        const resolvedPromises= await Promise.all([users,groupName]);

        users=resolvedPromises[0];
        groupName=resolvedPromises[1];

        

        let responseToSend=[];


        for(let element of users ){
            let check= await Members.findAll({where:{
                userId:element.dataValues.id,
                groupId:groupId

            }},{transaction:trn})

            if(check.length===0){
                responseToSend.push(element);

                await Members.create({
                    isAdmin:false,
                    userId:element.dataValues.id,
                    name:element.dataValues.name,
                    email:element.dataValues.email,
                    groupId:groupId,
                    groupName:groupName.dataValues.groupName
                },{transaction:trn})

            }

        }

        await trn.commit();

        res.status(201).json(responseToSend)
        
    } catch (error) {
        console.log(error);
        trn.rollback();
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
    exitGroup,

}
