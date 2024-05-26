const {DataTypes}=require('sequelize');
const database=require('../utils/database');

const Users=database.define('users',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true

    },

    name:DataTypes.STRING,

    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },

    phone:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
})


module.exports=Users;