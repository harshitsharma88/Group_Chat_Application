const Router= require('express').Router();
const authenticate= require('../middleware/auth');
const groupController=require('../controllers/groupController');


Router.post('/creategroup',authenticate,groupController.creategroup);

Router.get('/getmembers/:id',authenticate,groupController.getMembers);

Router.post('/addmembers',authenticate,groupController.addMember);

Router.get('/getallgroups',authenticate,groupController.getAllGroups);

Router.delete('/deletemember',groupController.deleteMember);

Router.put('/makeadmin',groupController.makeAdmin);

Router.put('/removeadmin',groupController.removeAdmin);





module.exports=Router;