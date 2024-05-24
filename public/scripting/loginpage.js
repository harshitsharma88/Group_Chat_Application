async function handleSignup(event){

    event.preventDefault();
    const name = event.target.signupName.value;
    const email = event.target.signupEmail.value;
    const phone = event.target.signupPhone.value;
    const password = event.target.signupPassword.value;
    const obj ={
        name:name,
        email:email,
        phone:phone,
        password:password
    }

    console.log(obj);

    try {
       const res= await axios.post('http://localhost:3000/signup',obj);
       console.log(res);
        alert(res.data.message);
        
    } catch (error) {
        console.log(error);
        alert(error.response.data.message)
        
    }

    

}

async function handleLogin(event){

    event.preventDefault();
    const email = event.target.loginEmail.value
    const password = event.target.loginPassword.value;

    const obj ={

        email:email,
        password:password
    }



    try {
        const res= await axios.post('http://localhost:3000/login',obj);
        console.log(res);
        
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("username",res.data.username);
        event.target.loginEmail.value="";
        event.target.loginPassword.value="";
        location.href='/chatpage'
        
    } catch (error) {

        console.log(error);
        alert(error.response.data.message)
        
    }

    
    
}