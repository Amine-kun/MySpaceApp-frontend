import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import {BsFillArrowRightCircleFill} from 'react-icons/bs';
import {FaGithubSquare, FaFacebookSquare, FaInstagramSquare, FaLinkedin} from 'react-icons/fa'
import {HiMail} from 'react-icons/hi';

const LandingPage =()=> {
  return (
    <div className="flex flex-col h-screen ">
      <div className="flex flex-col h-full lg:flex-row ">
          <div className="flex flex-col bg-gray-50 lg:w-2/5 lg:pl-8 h-full lg:pr-2">  
            <div className="flex flex-row pr-10 lg:pr-4">
              <Link
              to="/welcome"
              className="flex px-5 pl-9 gap-2 my-9 pt-1 w-190 items-center"
              >
                  <img src="http://localhost:3000/myspace.png" alt="logo" className="w-10 "/>
                  <p className="self-start text-1xl mt-2 text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 to-blue-700"><b>MySpace.</b></p>
              </Link>
                       <p className=" hidden lg:flex font-semibold text-gray-50 px-4  my-9 pt-2 pb-2 w-160 self-end ml-auto cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-600 text-center rounded-md hover:shadow-lg " >Who we are?</p>
                       <Link
                            to="/login"
                            className="flex  lg:hidden px-5 gap-2 my-6 pt-1 ml-auto items-center"
                            >
                                <p className="self-start text-1xl bg-gradient-to-r from-cyan-500 to-blue-700 text-gray-50 px-5 py-3 mt-1 bg-white rounded-md"><b>Get Started</b></p>
                            </Link>
            </div>
            <div className="h-full lg:h-auto lg:mt-20 px-10 lg:px-4 flex flex-col justify-center gap-9 bg-gradient-to-r from-cyan-500 to-blue-700 lg:bg-gradient-to-r lg:from-gray-50 lg:to-gray-50"> 
              <div>
                <p className="font-semibold text-3xl text-gray-50 text-left mb-3 lg:text-black"> 
                  Signup to <span className="text-gray-50 lg:text-transparent lg:bg-clip-text lg:bg-gradient-to-br lg:from-cyan-500 lg:to-blue-700">MySpace.</span>
                </p>
                <p className="text-xl text-gray-50 lg:text-black">
                  And create ideas, share your moments, 
                  get inspiration, and more. 
                </p>
              </div>
                <div className="flex justify-center items-center w-full rounder-md bg-white outline-none shadow-md shadow-md hover:border-b-2 hover:border-blue-700 lg:hover:border-blue-500 transition-all duration-100 ease-in ">
                    <input 
                      className="px-5 py-3 w-full outline-none"
                      type="text"
                      placeholder="Enter your Email for suggestions."
                      />
                       <HiMail fontSize={21} className="mr-2 w-10"/>
              </div>
                <BsFillArrowRightCircleFill className="self-center text-gray-50 h-9 w-9 cursor-pointer hover:text-blue-700 animate-bounce lg:text-blue-500"/>
              <div className="flex flex-row gap-2 text-gray-50 lg:text-blue-500 lg:hidden">
                <FaFacebookSquare className="w-8 h-8 cursor-pointer hover:text-blue-700"/>
                <FaInstagramSquare className="w-8 h-8 cursor-pointer hover:text-blue-700"/>
                <FaLinkedin className="w-8 h-8 cursor-pointer hover:text-blue-700"/>
                <FaGithubSquare className="w-8 h-8 cursor-pointer hover:text-blue-700"/>
              </div>
            </div>
        </div>
             <div className=" hidden lg:flex flex-col jusify-center items-end lg:w-3/5 h-full bg-gradient-to-r from-cyan-500 to-blue-700 pr-8">  
                <Link
                to="/login"
                className="flex  px-5 gap-2 my-6 pt-1  items-center"
                >
                    <p className="self-start text-1xl text-blue-500 px-5 py-3 mt-1 bg-white rounded-md"><b>Get Started</b></p>
                </Link>
                <div className=" self-center flex flex-row gap-3 h-full pt-40 ml-6 pr-6">
                  <div className=" text-gray-50 font-semibold text-5xl">
                          <p className="border-l-4 pl-5 py-6">Share the moment with your friends right now!!</p>
                  </div>
                  <div className="flex flex-col gap-2 text-gray-50">
                    <FaFacebookSquare className="w-8 h-8 cursor-pointer hover:text-white"/>
                    <FaInstagramSquare className="w-8 h-8 cursor-pointer hover:text-white"/>
                    <FaLinkedin className="w-8 h-8 cursor-pointer hover:text-white"/>
                    <FaGithubSquare className="w-8 h-8 cursor-pointer hover:text-white"/>
                  </div>
                </div>
             </div>
      </div>
{/*      <div className="w-full bg-gradient-to-r from-black to-gray-600 flex justify-center items-center text-white py-2">
       Myspace.
       @All right reserved 
      </div>*/}
    </div>
  );
}

export default LandingPage;
