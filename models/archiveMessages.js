const {DataTypes}= require('sequelize');
const database= require('../utils/database');

const messages= database.define('archivemessages',{

    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true,
        autoIncrement:true,
        primaryKey:true

    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    message:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isURL:{
        type:DataTypes.BOOLEAN

    }

})

module.exports=messages