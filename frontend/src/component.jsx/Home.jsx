import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Category from './Category';
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';


function Home() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const navigate=useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name)
        }
        else {
          setAuth(false)
          setMessage(res.data.Error);
          console.log(res.data.Error);

        }
      })
      .then(err => console.log(err))
  }, [])


  const handleDelete = () => {
    axios.get("http://localhost:8081/logout")
      .then(res => {
        // window.location.reload(true);
       navigate('/login');
      }).catch(err => console.log(err));
  }

  return (

    <div className='container mt-4'>
      {
        auth ?
          <div>
            <Navbar handleDelete={handleDelete} name={name} />
            {/* <div className="d-flex justify-content-center align-items-center vh-100">
              <Link
                to="/category"
                className="navbar-brand fw-bold text-black px-4 py-2 border border-4 rounded"
                style={{ borderColor: 'white', fontSize: '24px' }}
              >
                Check list
              </Link>
            </div> */}
            <Category />

          </div>
          :

          // <div className="d-flex justify-content-center align-items-center vh-100">
          //   <div className="text-center">
          //     <p>{message}</p>
          //     <h3>Login Now</h3>
          //     <Link to="/login" className="btn btn-primary">Login</Link>
          //   </div>
          // </div>
          // <Login/>
          <div>
            
          </div>

      }
    </div>

  )
}

export default Home
