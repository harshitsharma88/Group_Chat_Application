const router=require('express').Router();
const auth = require('../middleware/auth');
const messageController= require('../controllers/messageController');

router.post('/postmessage',auth,messageController.storeMessage);

router.get('/getmessage',auth,messageController.getMessages);

module.exports=router