import React, {useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import './App.css';
import Home from './Containers/Home';
import LandingPage from './Containers/LandingPage';
import Login from './Components/Login';

const App =()=> {
  const navigate = useNavigate();
  useEffect(()=>{
    const user = localStorage.getItem('user') !== 'undefined'
                    ? JSON.parse (localStorage.getItem('user'))
                    : localStorage.clear();
    if (!user) navigate('/welcome');
  },[])
  
  return (
    <Routes>
     <Route path="welcome" element={<LandingPage/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="/*" element={<Home/>}/>
    </Routes>
  );
}

export default App;
