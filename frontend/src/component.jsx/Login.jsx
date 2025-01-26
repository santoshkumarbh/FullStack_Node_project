import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {

    const [values,setValues]=useState({
        email:'',
        password:''
    });


    const navigate=useNavigate();
    axios.defaults.withCredentials=true;

    const handleSubmit=(event)=>{

        event.preventDefault();
        
        axios.post("http://localhost:8081/login",values)
        .then((res)=>
        {
            console.log(res);
            
            if(res.data.Status==="Success"){
                navigate("/");
                navigate("/category")
            }   
            else{
                alert("Error");
            }
        })
        .then(err=>console.log(err));
    }


  return (
    <div className='d-flex justify-content-center  align-items-center bg-primary vh-100'>
    <div className='bg-white p-5 rounded w-25'>
        <h2>Sign-in</h2>
        <form onSubmit={handleSubmit}>
        
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email </label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter email'
                onChange={(e)=>setValues({...values, email:e.target.value})} />
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder='Enter Password'
                onChange={(e)=>setValues({...values, password:e.target.value})}/>
            </div>
          
            <button type="submit" class="btn btn-success w-100 rounded-0">Login</button>
            <p>You are agree to terms and policies</p>
            <Link to="/register" className='btn btn-default w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
        </form>
    </div>
</div>
  )
}

export default Login
