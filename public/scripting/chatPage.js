const username= localStorage.getItem("username");
const token = localStorage.getItem("token");

document.querySelector('#username').textContent="Welcome "+username;


document.querySelector('.logout-button').addEventListener('click',()=>{
    localStorage.removeItem('token');
    location.replace('http://localhost:3000')
})