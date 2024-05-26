require('dotenv').config();
const PORT=process.env.SERVER;
const express= require('express');
const app= express();
const bodyparser = require('body-parser');
const cors = require('cors')


app.use(cors());
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(express.json());
app.use(express.static('public'));


/////////---Routes---///////////////
const userLoginRoute=require('./routes/userLoginRoute');
const chatPageRoute= require('./routes/chatPageRoute');
const messageRoute=require('./routes/messageRoute');




////////---request-handling---//////
app.use('/',userLoginRoute);
app.use('/chatpage',chatPageRoute);
app.use('/message',messageRoute);




//////////--Database--//////////////
const sequelize=require('./utils/database');

/////////--Models--////////////////
const Users=require('./models/users');
const Messages= require('./models/messages');



/////////--Relations--/////////////
Users.hasMany(Messages);
Messages.belongsTo(Users);



sequelize.sync()
.then(()=>{
    app.listen(3000,()=>{
        console.log(`Listening on Port: ${PORT}`);
    })

})


