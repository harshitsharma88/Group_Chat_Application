const msgs= require('./models/messages');

async function get(){
    const msg = await msgs.findAll({});
    console.log(msg);
}

get();