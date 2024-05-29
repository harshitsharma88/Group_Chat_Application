const {DataTypes}=require('sequelize');
const database= require('../utils/database');

const Members= database.define('members',{
    isAdmin:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    groupId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    name:DataTypes.STRING,
    email:DataTypes.STRING,
    groupName:DataTypes.STRING
})

module.exports=Members