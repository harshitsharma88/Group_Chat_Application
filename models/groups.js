const {DataTypes}=require('sequelize');
const database= require('../utils/database');

const groups= database.define('groups',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    groupName:{
        type:DataTypes.STRING,
        allowNull:false
    }

})

module.exports=groups