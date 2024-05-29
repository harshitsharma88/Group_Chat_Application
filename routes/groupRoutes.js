const Router= require('express').Router();
const authenticate= require('../middleware/auth');
const groupController=require('../controllers/groupController');
const { route } = require('./userLoginRoute');


Router.post('/creategroup',authenticate,groupController.creategroup);

Router.get('/getmembers/:id',authenticate,groupController.getMembers);

Router.post('/addmembers',authenticate,groupController.addMember);

Router.get('/getallgroups',authenticate,groupController.getAllGroups);

Router.delete('/deletemember',groupController.deleteMember);

Router.put('/makeadmin',groupController.makeAdmin);

Router.put('/removeadmin',groupController.removeAdmin);

Router.delete('/exitgroup',authenticate,groupController.exitGroup)





module.exports=Router;