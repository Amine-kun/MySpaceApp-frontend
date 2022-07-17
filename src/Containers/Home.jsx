import React, {useState, useRef, useEffect} from 'react';
import {HiMenu} from 'react-icons/hi';
import {AiFillCloseCircle} from 'react-icons/ai';
import {Link, Route, Routes} from 'react-router-dom';
import {client} from '../client';

import Sidebar from '../Components/Sidebar';
import UserProfile from '../Components/UserProfile';
import Pins from '../Containers/Pins';
import  {userQuery} from '../UtilityFunctions/data'


const Home =()=> {
  const [toggleSidebar, setToggleSidebar] = useState(false );
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);
  const userInfo = localStorage.getItem('user') !== 'undefined'
                    ? JSON.parse (localStorage.getItem('user'))
                    : localStorage.clear();
  useEffect(()=>{
    const query = userQuery(userInfo?.googleId);
    client.fetch(query)
      .then((data)=>{
        setUser(data[0]);
      })
  },[]);   

  useEffect(()=>{
    scrollRef.current.scrollTo(0,0)
  },[]);                  

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
        <div className="hidden md:flex h-screen flex-initial">
          <Sidebar user={user && user} closeToggle={setToggleSidebar}/>
        </div>
        <div className="flex md:hidden flex-row bg-gradient-to-r from-cyan-500 to-blue-600">
          <div className="p-2 w-full flex flex-row justify-between items-center shadow-md text-gray-50">
             <HiMenu fontSize={40} className="cursor-pointer"
            onClick={()=>setToggleSidebar(true)}/>
          <Link to='/' className="flex flex-row items-center"> 
              <img src="http://localhost:3000/myspace-white.png" alt="logo" className="w-10 mr-1 "/>
              <p className="self-start text-gray-50 text-1xl mt-1"><b>MySpace.</b></p>
          </Link>
          <Link to={`user-profile/${user?._id}`} className="flex flex-row items-center"> 
              <img src={user?.image} alt="logo" className="w-10 rounded-full"/>
          </Link>
        </div>
         { toggleSidebar && (
            <div className="fixed w-3/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
              <div className="absolute w-full flex justify-end items-center p-2">
                <AiFillCloseCircle fontSize={30} className="cursor-pointer "
                onClick={()=> setToggleSidebar(false)}/>
              </div>
              <Sidebar user={user && user} closeToggle={setToggleSidebar}/>
            </div>
          )}
        </div>
        <div className="pb-2 flex-1 h-screen overflow-y-auto" ref={scrollRef}>
          <Routes>
            <Route path="/user-profile/:userId" element={<UserProfile/>}/>
            <Route path="/*" element={<Pins user={user && user}/>}/>
          </Routes>
        </div>
    </div>
  );
}

export default Home;