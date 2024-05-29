const router=require('express').Router();
const authenticate = require('../middleware/auth');
const messageController= require('../controllers/messageController');

router.post('/postmessage',authenticate,messageController.storeMessage);

router.get('/getmessage',authenticate,messageController.getMessages);

module.exports=router