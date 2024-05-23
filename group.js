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


/////////---Routes---///////////////
const userLoginRoute=require('./routes/userLoginRoute');




////////---request-handling---//////
app.use('/',userLoginRoute);



//////////--Database--//////////////
// const sequelize=require('./utils/database');
const sequelize=require('./models/users');



sequelize.sync()
.then(()=>{
    app.listen(3000,()=>{
        console.log(`Listening on Port: ${PORT}`);
    })

})


