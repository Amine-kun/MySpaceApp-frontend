import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import {MdDownloadForOffline} from 'react-icons/md';
import {AiTwotoneDelete} from 'react-icons/ai';
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs';
import {urlFor, client} from '../client';

const Pin =({pins:{postedBy,image,_id,destination, save}})=> {
      const [postHovered, setPostHovered] = useState(false);
      const navigate = useNavigate();
      const user = localStorage.getItem('user') !== 'undefined'
                    ? JSON.parse (localStorage.getItem('user'))
                    : localStorage.clear();
      const alreadySaved = !!(save?.filter((item) => item.postedBy._id ===user.googleId))?.length;
      const savePin= (id)=>{
        if(!alreadySaved){

          client
            .patch(id)
            .setIfMissing({save:[]})
            .insert('after', 'save[-1]', [{
              _key: uuidv4(),
              userId: user.googleId,
              postedBy: {
                _type:'postedBy',
                _ref: user.googleId
              }
            }])
              .commit()
              .then(()=>{
                window.location.reload();
              })
        }
      }

      const deletePin = (id)=>{
        client 
          .delete(id)
          .then(()=>{
            window.location.reload();
          })
      }

  return (
    <div className="m-2 mb-5">
      <div 
      className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      onMouseEnter={()=> setPostHovered(true)}
      onMouseLeave={()=> setPostHovered(false)}
      onClick={()=> navigate(`/post/${_id}`)}>
       <img className="rounded-lg w-full" alt="post" src={urlFor(image).width(250).url()}/>
            {postHovered && (
        <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: '100%'}}>
            <div className="flex items-center justify-between">
                  <div className="flex-col gap-2">
                      <a  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75" href={`${image?.asset?.url}?dl=`}
                          download onClick={(e)=>e.stopPropagation()}> <MdDownloadForOffline/></a>
                  </div>
                  {alreadySaved ? ( <button type="button" 
                                            className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                                     {save?.length} Saved
                                    </button>) 
                                : (<button type="button" 
                                            className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none" 
                                            onClick={(e)=>{e.stopPropagation(); savePin(_id);}}>
                                    Save
                                    </button>)}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
                {destination && (
                    <a href={destination} target="_blank" rel="noreferrer"
                      className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:100 hover:shadow-md"
                      onClick={(e)=>e.stopPropagation()}>
                        <BsFillArrowUpRightCircleFill/>
                          {destination.slice(8,11)}
                      </a>
                  )}

                {postedBy?._id === user.googleId && (
                      <button type="button" 
                             className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75" 
                             onClick={(e)=>{e.stopPropagation(); deletePin(_id);}}>
                                <AiTwotoneDelete/>
                         </button>
                  ) }
            </div>
        </div>)}
      </div>
        <Link to={`user-profile/${postedBy?._id}`} className="flex gap-2 mt-2 items-center hover:bg-gray-200 px-2 py-2 rounded-full">
            <img className="w-8 h-8 rounded-full object-cover" src={postedBy?.image} alt="user-p"/>
            <p className="font-semibold capitalize">{postedBy?.userName} </p>
        </Link> 
    </div>
  );
}

export default Pin;