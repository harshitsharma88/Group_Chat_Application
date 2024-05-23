const Router = require('express').Router();
const chatPageController= require('../controllers/chatPageController');

Router.get('/',chatPageController.sendChatPage);

module.exports=Router;