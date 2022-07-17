import React from 'react';
import GoogleLogin from 'react-google-login';
import {useNavigate, NavLink, Link} from 'react-router-dom';
import {AiFillGoogleCircle} from 'react-icons/ai';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import {client} from '../client'




const Login =()=> {
        const navigate = useNavigate();
        const responseGoogle=(response)=>{
              localStorage.setItem('user', JSON.stringify(response.profileObj))
            const {name, googleId, imageUrl}= response.profileObj;
            const doc = {
               _id: googleId,
               _type:'user',
               userName: name,
               image: imageUrl,
            }
            client.createIfNotExists(doc)
            .then(()=>{
                navigate('/', {replace: true})
            })
        }



  return (
    <div className="flex flex-col h-screen">
        <div className="bg-gray-50 flex flex-row items-center">
                    <p className="self-start ml-10 text-2xl text-blue-500 mb-10"><b>MySpace</b><span className="text-8xl">.</span></p>
                    <Link
                        to="/welcome"
                        className="flex px-5 mt-2 mx-10  text-gray-50 font-bold items-center ml-auto bg-gradient-to-r from-cyan-500 to-blue-700 rounded-md"
                        >   <AiOutlineArrowLeft className="w-5 h-5"/>
                            <p className="self-start text-1xl pr-5 pl-3 py-3 "> Home Page</p>
                    </Link>
        </div>
        <div className="flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-700 h-full">
            <div className="flex flex-col items-center justify-center gap-5">
                   <div className="flex flex-col items-center gap-3">
                         <p className="text-5xl text-gray-50 font-bold">Login and Signup</p>
                         <p className="text-5xl text-gray-50 font-bold">via Google</p>
                         <p className="text-xl font-semibold text-gray-50">Easy and Fast!</p>
                   </div>
                   <span className="border-b-2 border-gray-50 w-20"></span>
                     <GoogleLogin
                             clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                               render={(renderProps)=>(
                                             
                                   <button
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                     className="bg-gray-50 cursor-pointer flex items-center justify-center gap-1 w-full px-10 py-2 text-sm text-white border border-gray-300 rounded-full hover:shadow-lg hover:bg-gray-200">
                                        <AiFillGoogleCircle className="text-blue-700 w-5 h-5"/>
                                        <p className="text-blue-700"><b>Google</b></p>
                                   </button>
                                        )}
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy="single_host_origin"
                          />
            </div>
        </div>                                  
    </div>
  );
}

export default Login;