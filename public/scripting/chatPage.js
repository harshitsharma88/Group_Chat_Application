window.onload=scrollChatSection;

const username= localStorage.getItem("username");
const token = localStorage.getItem("token");
const section =document.querySelector('.chat-area');
const inputText= document.querySelector('#inputtext')


/////-Welcome Text-///////
document.querySelector('#username').textContent="Welcome "+username;

///////-Logout-Button-/////
document.querySelector('.logout-btn').addEventListener('click',()=>{
    localStorage.removeItem('token');
    location.replace('http://34.228.115.60')
});

 setInterval(async()=>{
    const response= await axios.get('http://34.228.115.60/message/getmessage',{headers:{authorization:token}});
    section.innerHTML='';
    response.data.forEach(element=>{
        if(element.self){
            senderMessage(element);

        }
        else{
            receiverMessage(element);

        }
    })




},1000)

////////---Scroll Chat Section Whenevr new message receives---//////////

async function scrollChatSection(){
   
   section.scrollTop=section.scrollHeight

}



document.querySelector('.message-form').addEventListener('submit',sendmessage);

function receiverMessage(object){
    
    const message=object.message;

    const other= document.createElement('div');
    other.classList='message other'

    const receivername= document.createElement('div');
    receivername.className='name';
    receivername.textContent=`${object.name}`;

    const recivermsg = document.createElement('div');
    recivermsg.className='text';
    recivermsg.textContent=`${message}`;

    other.appendChild(receivername);
    other.appendChild(recivermsg);
    section.appendChild(other); 

    scrollChatSection();
}

async function sendmessage(event){
    event.preventDefault();
    const message=event.target.message.value.trim();

    if(message!==''){


    event.target.message.value='';
    inputText.focus();

    const response = await axios.post('http://34.228.115.60/message/postmessage',
                {message:message,name:username},
                {headers:{authorization:token}});


    

    }

}

async function senderMessage(object){
    const sender = document.createElement('div');
    sender.classList='message sender';

    const text= document.createElement('div');
    text.classList='text';
    text.textContent=`${object.message}`;

    sender.appendChild(text);
    section.appendChild(sender);

    scrollChatSection();

}


