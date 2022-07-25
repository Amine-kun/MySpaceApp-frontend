import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {AiOutlineLogout} from 'react-icons/ai';
import {useParams, useNavigate} from 'react-router-dom';
import {GoogleLogout} from 'react-google-login';
import {userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../UtilityFunctions/data';
import {client} from '../client';
import MSL from './MSL';
import Spinner from './Spinner';

const randomImg='https://source.unsplash.com/1600x900/?nature,photography,technology';
const activeBtnStyles = "bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfile =()=> {
     const [user, setUser]=useState(null);
     const [pins, setPins]=useState(null);
     const [text, setText]=useState('Posts');
     const [activeBtn, setActiveBtn]=useState('created');
     const navigate=useNavigate();
     
     const {userId} = useParams();

     useEffect(()=>{
        const query = userQuery(userId);

        client.fetch(query)
          .then((data)=>{
            setUser(data[0]);
          })
     },[userId])

     useEffect(()=>{
        if (text==='Posts') {
            const createdPost = userCreatedPinsQuery(userId);

            client.fetch(createdPost)
              .then((data)=>{
                setPins(data);
              })
        } else {
           const savedPost = userSavedPinsQuery(userId);

            client.fetch(savedPost)
              .then((data)=>{
                setPins(data);
              })
        }

     },[text, userId])


     const Logout =()=> {
              navigate('/welcome');
      localStorage.clear();

     }

     if(!user){
      return <Spinner message="Loading Profile"/>
     }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
              <img 
                src={randomImg}
                className="w-full h-250 2xl:h-510 shadow-lg object-cover"
                alt="background"
              />
              <img 
                className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
                src={user.image}
                />
              <h1 className="font-bold text-2xl sm:text-3xl text-center mt-3">{user.userName}</h1>
              {user._id === '103601504774696354256' && <h1 className="font-semibold border-b-2 border-blue-500 my-4">Creator and the developer of this website</h1>}
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === user._id && (
                  <GoogleLogout
                          clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                          render={(renderProps)=>(
                                             
                             <button
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                className="bg-white p-2 m-5 rounded-full cursor-pointer outline-none shadow-md">
                                        <AiOutlineLogout color="red" fontSize={21}/>
                             </button>
                                        )}
                                        onLogoutSuccess={Logout}
                                        cookiePolicy="single_host_origin"
                    />
                )}
            </div>
          </div>
          <div className="mb-7 flex flex-row justify-center gap-2 pt-3">
              <button type="button" 
                      onClick={(e)=>{setText(e.target.textContent); setActiveBtn('created');}}
                      className={`${activeBtn==='created' ? activeBtnStyles : notActiveBtnStyles}`}>
                      Posts
              </button>
              <button type="button" 
                      onClick={(e)=>{setText(e.target.textContent); setActiveBtn('saved');}}
                      className={`${activeBtn==='saved' ? activeBtnStyles : notActiveBtnStyles}`}>
                      Saved
              </button>

          </div>
          <div className="px-2 ">
            { pins 
                  ? <div className="flex flex-col gap-5">
                        {userId === user._id && (
                            <Link to='/create-pin' className="self-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full w-12 h-12 flex justify-center items-center font-bold">
                                                              +
                            </Link>
                          )}
                        <MSL pins={pins}/>
                     </div>
                  
                  : <div className="flex flex-col gap-4 justify-center items-center bg-white py-10 rounded-lg ">
                               <p className="text-gray-500 font-bold">You have no Posts yet.</p>
                        {userId === user._id && (
                            <Link to='/create-pin' className="self-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full w-12 h-12 flex justify-center items-center font-bold">
                                                              +
                            </Link>
                          )}
                                <p className="text-gray-500 font-bold">Create one now, if you'd like :D!</p>
                     </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;