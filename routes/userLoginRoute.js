const Router = require('express').Router();
const userLoginController=require('../controllers/userLoginController');

Router.get('/',userLoginController.getLoginPage);

Router.post('/signup',userLoginController.signup);

Router.post('/login',userLoginController.login);

module.exports=Router;