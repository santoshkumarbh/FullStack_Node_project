import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

function Register() {
    const [values,setValues]=useState({
        name:'',
        email:'',
        password:''
    });


    const navigate=useNavigate();

    const handleSubmit=(event)=>{

        event.preventDefault();
        
        axios.post("http://localhost:8081/register",values)
        .then((res)=>
        {
            if(res.data.Status==="Success"){
                navigate("/login");
            }   
            else{
                alert("Error");
            }
        })
        .then(err=>console.log(err));
    }

    return (
        <div className='d-flex justify-content-center  align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-Up</h2>
                <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="exampleInputName" class="form-label">Name</label>
                        <input type="text" class="form-control" id="exampleInputName" aria-describedby="emailHelp" placeholder='Enter name' 
                        onChange={(e)=>{setValues({...values,name:e.target.value});
                     
                        }}/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email </label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter email' 
                        onChange={(e)=>{setValues({...values,email:e.target.value});
                       }}/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder='Enter password'
                        onChange={(e)=>{setValues({...values,password:e.target.value});
                   }}/>
                    </div>

                    <button type="submit" class="btn btn-primary w-100 rounded-0">Sign up</button>
                    <p>You are agree to terms and policies</p>
                    <Link to="/login" className='btn btn-default w-100 bg-light rounded-0 text-decoration-none'>Login</Link>


                </form>
            </div>
        </div>
    )
}

export default Register
