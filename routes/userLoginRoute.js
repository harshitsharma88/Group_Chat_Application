const Router = require('express').Router();
const path=require('path');
const userLoginController=require('../controllers/userLoginController');

Router.get('/',userLoginController.getLoginPage);

module.exports=Router;