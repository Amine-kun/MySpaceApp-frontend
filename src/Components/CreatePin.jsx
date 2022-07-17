import React, {useState} from 'react';
import {AiOutlineCloudUpload} from 'react-icons/ai';
import {MdDelete} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import {client} from '../client';
import Spinner from './Spinner';
import {categories} from '../UtilityFunctions/data'

const CreatePin =({user})=> {
    const [title, setTitle]=useState('');
    const [destination, setDestination]=useState('');
    const [about, setAbout]=useState('');
    const [loading, setLoading]=useState(false);
    const [fields, setFields]=useState(null);
    const [categorie, setCategorie]=useState(null);
    const [imageAsset, setImageAsset]=useState(null);
    const [wrongImgType, setWrongImgType]=useState(false);
    const [section, setSection]=useState('posts');

    const navigate=useNavigate();


    const uploadImage = (e) =>{
      const {type, name} = e.target.files[0];
        if (type === 'image/png'
            || type === 'image/jpeg'
            || type === 'image/gif'
            || type === 'image/svg'){
          setWrongImgType(false);
         setLoading(true);
         client.assets
            .upload('image', e.target.files[0], {contentType:type, filename:name})
            .then((doc)=>{
              setImageAsset(doc);
              setLoading(false);
            })
            .catch((err)=>{
              console.log(err);
            })
        } else {
          setWrongImgType(true);
        }
    }

   const savePin=()=>{
      if (section === 'Articles'){
        if(title && about && imageAsset?._id && categorie){
        const docu={
          _type:'article',
          title,
          about,
          image :{
            _type:'image',
            asset:{
              _type: 'reference',
              _ref: imageAsset?._id
            }
          },
          userID: user._id,
          postedBy:{
            _type:'postedBy',
            _ref:user._id
          },
          categorie,
        }
        client.create(docu)
          .then(()=>{
            navigate('/')
          })
      } else {
        setFields(true);
        setTimeout(()=>{setFields(false)},2000)
      }
    }   else {
           if(title && about && imageAsset?._id && categorie){
            const doc={
              _type:'pin',
              title,
              about,
              destination,
              image :{
                _type:'image',
                asset:{
                  _type: 'reference',
                  _ref: imageAsset?._id
                }
              },
              userID: user._id,
              postedBy:{
                _type:'postedBy',
                _ref:user._id
              },
              categorie,
            }
            client.create(doc)
              .then(()=>{
                navigate('/')
              })
          } else {
            setFields(true);
            setTimeout(()=>{setFields(false)},2000)
          }

     }
    }

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">Please fill all the fields</p>)}
        <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
          <div className="bg-secondaryColor p-3 flex flex-0.7 w-full cursor-pointer">
            <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
              {loading && <Spinner/>}
              {wrongImgType && (
                  <p > Wrong image type</p>
                )}
               {!imageAsset ?(
                  <label  >
                    <div className="flex flex-col items-center h-full cursor-pointer">
                      <div className="flex flex-col justify-center items-center">
                        <p className="font-bold text-2xl">
                            <AiOutlineCloudUpload/>   
                        </p>
                        <p className="text-md font-semibold">Click to upload</p>
                      </div>
                        <p className="mt-32 text-gray-400">
                          use high-quality JPG, SVG, PNG, GIF less than 20MB
                        </p>
                    </div>
                    <input type="file" name="upload-image" onChange={uploadImage} 
                    className="w-0 h-0"/>
                  </label>
                ):(
                  <div className="relative h-full">
                    <img src={imageAsset.url} alt="uploaded" className="h-full w-full"/>
                      <button type="button" className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                      onClick={()=> setImageAsset(null)}>
                          <MdDelete/>
                      </button>
                  </div>
                )} 
            </div>
          </div>
              <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
                <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)}
                 placeholder="Add title" 
                 className="outline-none text-2xl sm:text-2xl font-bold border-b-2 border-gray-200 p-2"/>
                <input type="text" value={about} onChange={(e)=> setAbout(e.target.value)}
                 placeholder="Add Description" 
                 className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"/>
                 <input type="text" value={destination} onChange={(e)=> setDestination(e.target.value)}
                 placeholder="Add Reference Link (optional)" 
                 className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"/>
                      <div className="flex flex-col">
                        <div>
                            <p className="mb-2 font-semibold text-lg sm:text-xl">Chose categorie</p>
                            <select className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                                 onChange={(e)=>setCategorie(e.target.value)}>
                                          <option value="other" className="bg-white">Select categorie</option>
                                            {categories.map((cat)=>(
                                              <option className="text-base border-0 outline-none capitalize bg-white text-black" value={cat.name}>{cat.name}</option>
                                              ))}
                            </select>
                        </div>
                        {user?._id === '103601504774696354256' && 
                            <div className="mt-3">
                            <select className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                                 onChange={(e)=>setSection(e.target.value)}>
                                           <option value="other" className="bg-white">Select section</option>
                                           <option className="text-base border-0 outline-none capitalize bg-white text-black" value="Posts">Posts</option>
                                           <option className="text-base border-0 outline-none capitalize bg-white text-black" value="Articles">Articles</option>
                            </select>
                        </div>}
                      </div>
                      <div className="flex justify-end items-end mt-5">
                           <button type="button" onClick={savePin} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold p-2 rounded-full w-28 outline-none">Save post</button>
                      </div>
              </div>
        </div>
    </div>
  );
}

export default CreatePin;