import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import {RiHomeFill} from 'react-icons/ri';
import {RiAccountCircleFill} from 'react-icons/ri';
import {IoIosArrowForward} from 'react-icons/io';
import {categories} from '../UtilityFunctions/data';
import {AiOutlineLogout} from 'react-icons/ai';
import {useNavigate} from 'react-router-dom';
import {GoogleLogout} from 'react-google-login';


const isNotActiveStyle = "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-100 ease-in-out capitalize";
const isActiveStyle = " bg-gradient-to-r from-cyan-500 to-blue-600 text-white mx-2 py-2 rounded-md flex items-center px-5 gap-3 font-extrabold  transition-all duration-100 ease-in-out capitalize";


const Sidebar =({user ,closeToggle})=> {
    const closeSidebar = () =>{
      if (closeToggle) closeToggle(false);
    }
    const navigate=useNavigate();
    const Logout =()=> {
      localStorage.clear();
        navigate('/welcome');
     }

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-auto min-w-210">
      <div className="flex flex-col">
          <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={closeSidebar}>
              <img src="http://localhost:3000/myspace.png" alt="logo" className="w-10 "/>
              <p className="self-start text-1xl text-blue-500 mt-1"><b>MySpace.</b></p>
          </Link>
          <div className="flex flex-col gap-5">
            <NavLink
             to="/"
             className={({isActive})=> isActive ? isActiveStyle : isNotActiveStyle}
             onClick={closeSidebar}>
                <RiHomeFill className="w-5"/>
                  Home
            </NavLink>
            <NavLink
             to={`/user-profile/${user?._id}`}
             className={({isActive})=> isActive ? isActiveStyle : isNotActiveStyle}
             onClick={closeSidebar}>
                <RiAccountCircleFill className="w-5 h-5"/>
                  Profile
            </NavLink>
                <h3 className="mt-2 px-5 text-base 2xl:text-xl"><b>Categories </b></h3>
                    {categories.slice(0, categories.length-1).map((cat)=> (
                        <NavLink 
                        to={`/category/${cat.name}`} 
                        className={({isActive})=> isActive ? isActiveStyle : isNotActiveStyle}
                        onClick={closeSidebar} key={cat.name}>
                              <img src={cat.image}  className="w-8 h-8 rounded-full shadow-sm " alt="sm"/>
                              {cat.name}
                        </NavLink>
                      ))}
          </div>
      </div>
        {user && (
                        <GoogleLogout
                          clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                          render={(renderProps)=>(
                                             
                             <button
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                className="bg-white p-2 rounded-md cursor-pointer outline-none flex my-5 mb-3 gap-2 p-2 items-center justify-center bg-white rounder-lg shadow-lg mx-3">
                                        <AiOutlineLogout color="red" fontSize={21}/>
                                         <p className="font-semibold">Sign off</p>
                             </button>
                                        )}
                                        onLogoutSuccess={Logout}
                                        cookiePolicy="single_host_origin"
                    />

          )}
    </div>
  );
}

export default Sidebar;