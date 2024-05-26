window.onload=scrollChatSection;

const username= localStorage.getItem("username");
const token = localStorage.getItem("token");
const section =document.querySelector('.chat-area');


/////-Welcome Text-///////
document.querySelector('#username').textContent="Welcome "+username;

///////-Logout-Button-/////
document.querySelector('.logout-btn').addEventListener('click',()=>{
    localStorage.removeItem('token');
    location.replace('http://54.237.202.193')
});

////////---Scroll Chat Section Whenevr new message receives---//////////

function scrollChatSection(){
    section.scrollTop=section.scrollHeight

}

document.querySelector('.message-form').addEventListener('submit',sendmessage);

function receivemessage(event){
    event.preventDefault();
    const message=event.target.message.value;

    const other= document.createElement('div');
    other.classList='message other'

    const receivername= document.createElement('div');
    receivername.className='name';
    receivername.textContent=`${username}`;

    const recivermsg = document.createElement('div');
    recivermsg.className='text';
    recivermsg.textContent=`${message}`;

    other.appendChild(receivername);
    other.appendChild(recivermsg);
    section.appendChild(other); 

    scrollChatSection();
}

function sendmessage(event){
    event.preventDefault();
    const message=event.target.message.value;

    const sender = document.createElement('div');
    sender.classList='message sender';

    const text= document.createElement('div');
    text.classList='text';
    text.textContent=`${message}`;

    sender.appendChild(text);
    section.appendChild(sender);

    scrollChatSection();


}
