const jwt = require('jsonwebtoken');

const obj = {
    name:"HArshit",
    id:2,
    phone:8059
}

function JWT(obj){
    return jwt.sign(obj,"harshit");
}

function decrypt(token){
    return jwt.decode(token,"harshit");
}

const j = JWT(obj);
console.log("j=  ",j);

const de= decrypt(j);
console.log(de);

