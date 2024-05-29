

window.onload=scrollChatSection;

const username= localStorage.getItem("username");
const token = localStorage.getItem("token");
const section =document.querySelector('.chat-area');
const inputText= document.querySelector('#inputtext');
const aside = document.querySelector('aside');
const table= document.querySelector('#infoTable');

document.addEventListener('DOMContentLoaded',getAllGroups);

//////---Get All Groups of Current User---/////
async function getAllGroups(event){
    try {
        const response= await axios.get('http://34.228.115.60/group/getallgroups',
        {headers:{authorization:token}});

        const allGroups= response.data;

        console.log(Array.isArray(allGroups));
        console.log(allGroups);

        allGroups.forEach(element=>{
            showGroups(element.groupName,element.groupId,element.isAdmin)
        })


        
    } catch (error) {
        
    }
}



/////-Welcome Text-///////
document.querySelector('#username').textContent="Welcome "+username;

///////-Logout-Button-/////
document.querySelector('.logout-btn').addEventListener('click',()=>{
    localStorage.removeItem('token');
    location.replace('http://34.228.115.60')
});

//  setInterval(async()=>{
//     const response= await axios.get('http://34.228.115.60/message/getmessage',{headers:{authorization:token}});
//     section.innerHTML='';
//     response.data.forEach(element=>{
//         if(element.self){
//             senderMessage(element);

//         }
//         else{
//             receiverMessage(element);

//         }
//     })
// },1000)

////////---Scroll Chat Section Whenevr new message receives---//////////

async function scrollChatSection(){
   
   section.scrollTop=section.scrollHeight

}

/////////////------Create Group And Add the info In Side Panel------///////////

const dialogForm= document.querySelector('#dialogForm');
dialogForm.addEventListener('submit',createGroup);

async function createGroup(event){
    event.preventDefault();

    const groupInfo={
        groupName:event.target.groupName.value,
        members:event.target.membersName.value.split(',')
    }

    try {

        const response= await axios.post('http://34.228.115.60/group/creategroup',
        groupInfo,
        {headers:{authorization:token}});

        showGroups(response.data.groupName,response.data.groupId,true)

        document.getElementById('myDialog').close();

        


        
    } catch (error) {
        console.log(error);
        // alert(error.response.data.message)

        
    }
}

/////////--Show All Groups in Side Panel----///////

function showGroups(groupName,groupId,isAdmin){
    
    const sideDiv= document.createElement('div');
    sideDiv.className='sideDiv';

    const groupNameBtn= document.createElement('button');
    groupNameBtn.textContent=`${groupName}`
    groupNameBtn.className='groupNameBtn';
    groupNameBtn.setAttribute("id",`name-${groupId}`)
    sideDiv.appendChild(groupNameBtn);

    if(isAdmin){
        const groupInfoBtn= document.createElement('button');
        groupInfoBtn.textContent='!'
        groupInfoBtn.className='groupInfoBtn';
        groupInfoBtn.setAttribute("id",`info-${groupId}`)
        groupInfoBtn.addEventListener('click',editGroup);
        sideDiv.appendChild(groupInfoBtn);
    }
    else{
        groupNameBtn.style.width='100%';
        
    } 
    

    aside.appendChild(sideDiv);

}

//////////---Edit Group Dialog Box-----//////




async function editGroup(event){
    const groupId = event.target.getAttribute('id').split('-')[1];
    try {

        const response = await axios.get(`http://34.228.115.60/group/getmembers/${groupId}`,
        {headers:{authorization:token}}
        );

        const array = response.data;

        ///////--As Dialog will pop-up this form class will be same as group id--///
        document.querySelector('#editGroupForm').className=groupId;


        table.innerHTML='';

        addMemberToDialogTable(array,groupId);

        

        document.querySelector('#groupInfoDialog').showModal();
        
    } catch (error) {

        console.log(error);
        alert(error);
        
    }

}

/////--Add New Member---////
document.querySelector('#editGroupForm').addEventListener('submit',addMember);

async function addMember(event){
    event.preventDefault();
    const groupId= event.target.className;
    
    const members= event.target.membersName.value.split(',');
    const table= document.querySelector('#infoTable');
    try {
        const response= await axios.post('http://34.228.115.60/group/addmembers',{groupId:groupId,members:members},
        {headers:{authorization:token}} 
        );


        const array= response.data;

      /*  array.forEach(element=>{

            const tr= document.createElement('tr');
            tr.setAttribute('id',element.id);
            tr.innerHTML=`<td>${element.name}</td><td>${element.email}<td>`;

            const adminButton=document.createElement('button');
            adminButton.className='adminButton'
            adminButton.textContent='Make Admin';
            adminButton.addEventListener('click',(event)=>{makeAdmin(event,groupId)});
            const td1=document.createElement('td');
            td1.appendChild(adminButton)
            tr.appendChild(td1);

            const removeButton=document.createElement('button');
            removeButton.className='removeButton'
            removeButton.textContent='Remove';
            removeButton.addEventListener('click',(event)=>{removeGroup(event,groupId)});
            const td2=document.createElement('td');
            td2.appendChild(removeButton)
            tr.appendChild(td2);

            table.appendChild(tr);

        })  */

        addMemberToDialogTable(array,groupId);

        
    } catch (error) {
        console.log(error);
        alert(error);
        
    }
    

}

//////--Add Member to Dialog Table---//////

function addMemberToDialogTable(array,groupId){


    for(let i=0;i<array.length;i++){
        const tr= document.createElement('tr');
        tr.setAttribute('id',array[i].userId);
        tr.innerHTML=`<td>${array[i].name}</td><td>${array[i].email}<td>`;

        if(array[i].isAdmin&&array[i].self){
            

        const removeButton=document.createElement('button');
        removeButton.className='removeButton'
        removeButton.textContent='Leave';
        removeButton.addEventListener('click',(event)=>{removeGroup(event,groupId)});
        const td=document.createElement('td');
        td.appendChild(removeButton);
        tr.appendChild(td);

        table.insertBefore(tr,table.firstChild);
        continue;

        }

        else if(array[i].isAdmin&&!array[i].self){
        const td1=document.createElement('td');

        const adminButton=document.createElement('button');
        adminButton.className='adminButton'
        adminButton.textContent='Remove Admin';
        adminButton.addEventListener('click',(event)=>{removeAdmin(event,groupId)});
        td1.appendChild(adminButton)
        tr.appendChild(td1);

        }
        else{
        const td1=document.createElement('td');

        const adminButton=document.createElement('button');
        adminButton.className='adminButton'
        adminButton.textContent='Make Admin';
        adminButton.addEventListener('click',(event)=>{makeAdmin(event,groupId)});
        td1.appendChild(adminButton)
        tr.appendChild(td1);

        }           

        const td2=document.createElement('td');

        const removeButton=document.createElement('button');
        removeButton.className='removeButton'
        removeButton.textContent='Remove';
        removeButton.addEventListener('click',(event)=>{removeGroup(event,groupId)});
        td2.appendChild(removeButton);
        tr.appendChild(td2);

        table.appendChild(tr);
    }

}

/////////-Remove From Group-////////

async function removeGroup(event,groupId){
    const userId= event.target.parentNode.parentNode.getAttribute('id');
    console.log(userId);
    console.log(groupId);
    try {
        await axios(
            {url:'http://34.228.115.60/group/deletemember',
            data:{userId:userId,groupId:groupId},
            method:'delete'
        })

        if(event.target.textContent=='Leave'){
            document.querySelector(`#name-${groupId}`).parentNode.remove();
            document.querySelector('#groupInfoDialog').close();
            return;

        }

        event.target.parentNode.parentNode.remove();
        
    } catch (error) {
        
    }

}

async function makeAdmin(event,groupId){
    const userId= event.target.parentNode.parentNode.getAttribute('id');
    try {
        if(event.target.textContent=='Remove Admin'){
            removeAdmin(event,groupId);
            return;
        }
        await axios(
            {url:'http://34.228.115.60/group/makeadmin',
            data:{userId:userId,groupId:groupId},
            method:'put'
        })

        event.target.textContent='Remove Admin';
        console.log("Made Admin");
        
    } catch (error) {
        console.log(error);
        alert(error)
        
    }
    


}

async function removeAdmin(event,groupId){
    const userId= event.target.parentNode.parentNode.getAttribute('id');
    try {
        if(event.target.textContent=='Make Admin'){
            makeAdmin(event,groupId);
            return;
        }
        await axios(
            {url:'http://34.228.115.60/group/removeadmin',
            data:{userId:userId,groupId:groupId},
            method:'put'
        })

        event.target.textContent='Make Admin'
        console.log("Removed Admin");
        
    } catch (error) {
        console.log(error);
        alert(error)
        
    }

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


////////////////-DialogBox-New Group-////////////////

document.getElementById('openDialog').addEventListener('click', function() {
    document.getElementById('myDialog').showModal();
  });
  
  document.getElementById('closeDialog').addEventListener('click', function() {
    document.getElementById('myDialog').close();
  });

////////////---Edit Group Button Listener---///////////


document.querySelector('#groupInfo').addEventListener('click',function(){
    document.querySelector('#groupInfoDialog').showModal();
})

document.querySelector('#closeInfoDialog').addEventListener('click',function(){
    document.querySelector('#groupInfoDialog').close();
})


