require('dotenv').config();

/////--Requiring all the packages--//////
const PORT=process.env.SERVER;
const express= require('express');
const path = require("path");
const app= express();
const bodyparser = require('body-parser');
const cors = require('cors')
const http=require('http').Server(app);
const io = require('socket.io')(http);



/////-- Condfiguring all the packagaes functions--///////


app.use(cors());
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(express.json());
app.use(express.static(path.resolve('public')));


/////////---Routes---///////////////
const userLoginRoute=require('./routes/userLoginRoute');
const chatPageRoute= require('./routes/chatPageRoute');
const messageRoute=require('./routes/messageRoute');
const groupRoute= require('./routes/groupRoutes');




////////---request-handling---//////
app.use('/',userLoginRoute);
app.use('/chatpage',chatPageRoute);
app.use('/message',messageRoute);
app.use('/group',groupRoute);




//////////--Database--//////////////
const sequelize=require('./utils/database');

/////////--Models--////////////////
const Users=require('./models/users');
const Messages= require('./models/messages');
const Groups=require('./models/groups');
const Members=require('./models/members');



/////////--Relations--/////////////
Users.hasMany(Messages);
Users.hasMany(Groups);

Messages.belongsTo(Users);
Messages.belongsTo(Groups);

Groups.hasMany(Users);
Groups.hasMany(Messages);



///////--Socket Events--///////
const socketAuthenticate=require('./middleware/socketAuthenticate');
const {storeMessage}= require('./controllers/messageController');
const { receiveMessageOnPort } = require('worker_threads');




sequelize.sync()
.then(()=>{
    http.listen(3000,()=>{
        console.log(`Listening on Port: ${PORT}`);
        
    });

    io.on('connection',(socket)=>{
        console.log('Socket Connected'); 

        socket.on('sendMessage',async(data)=>{
            try {
                const {message,groupId}=data;
                const user = await socketAuthenticate(data);
                await storeMessage(user,message,groupId);
                data.name=user.name;
                io.emit('receivedMessage',data);


                
                
                
            } catch (error) {
                console.log(error);
                io.emit('errorResponse',(error))                
            }
           

        });

    })
    
    

}).catch(err=>{
    console.log(err);
})


