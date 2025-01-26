import React from 'react';
import Register from './component.jsx/Register';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from './component.jsx/Home';
import Login from './component.jsx/Login';
import Category from './component.jsx/Category';
import CreateStudent from './component.jsx/CreateStudent';
import UpdateStudent from './component.jsx/UpdateStudent';

const App = () => {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/category" element={<Category/>}></Route>
      <Route path='/create' element={<CreateStudent/>}></Route>
      <Route path='/category/update/:id' element={<UpdateStudent/>}></Route>
    </Routes>
   </BrowserRouter>
  );
};

export default App;
