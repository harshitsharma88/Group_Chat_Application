require('dotenv').config();
const PORT=process.env.SERVER;
const express= require('express');
const app= express();

app.use(express.static('public'));


/////////---Routes---///////////////
const userLoginRoute=require('./routes/userLoginRoute');




////////---request-handling---//////
app.use('/',userLoginRoute);



//////////--Database--//////////////
const sequelize=require('./utils/database');



sequelize.sync()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Listening on Port: ${PORT}`);
    })

})


