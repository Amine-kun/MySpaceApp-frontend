import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AiTwotoneDelete} from 'react-icons/ai';
import {client} from '../client';

const Article =({articles, user})=> {
  const navigate = useNavigate();

   const deletePin = (id)=>{
        client 
          .delete(id)
          .then(()=>{
            window.location.reload();
          })
      }

  return (
    <div className="flex flex-col lg:flex-row lg:flex-wrap gap-3 justify-center items-center">

        {articles?.map((article)=>(
          <div className="bg-white shadow-lg rounded-lg w-4/5 p-0 lg:p-8 pb-12 mb-8 w-full xl:w-2/5">
        <div className="relative overflow-hidden shadow-md pb-80 mb-6">
          <img src={article?.image.asset.url} onClick={()=> navigate(`/article/${article?._id}`)} alt="img" className="object-mid absolute w-full h-full object-cover cursor-pointer shadow-lg rounded-t-lg lg:rounded-lg" />
            {article.postedBy?._id === user?._id && (
                          <button type="button" 
                                 className="bg-white w-9 h-9 mx-4 my-4 rounded-full flex items-center justify-center text-dark text-xl opacity-75" 
                                 onClick={(e)=>{e.stopPropagation(); deletePin(article._id);}}>
                                    <AiTwotoneDelete/>
                             </button>
                      ) }
        </div>
         <div className="block lg:flex text-center items-center justify-center mb-8 w-full bg-gray-50 rounded-lg py-2">
          <div className="flex items-center flex-row justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8 items-center cursor-pointer" onClick={()=> navigate(`/user-profile/${article?.postedBy._id}`)}>
            <img className="w-5 h-5 rounded-full" src={article.postedBy.image}/>
            <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">{article.postedBy.userName}</p>
          </div>
          <div className="font-medium text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="align-middle">{article._createdAt}</span>
          </div>
        </div>
        <h1 className="transition duration-700 text-center mb-8 cursor-pointer hover:text-blue-600 text-3xl font-semibold" onClick={()=> navigate(`/article/${article?._id}`)}>
          {article.title}
        </h1>
        <div className="text-center">
            <span  onClick={()=> navigate(`/article/${article?._id}`)} className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-lg font-base rounded-full text-white px-8 py-2 cursor-pointer">Read!</span>
        </div>
        </div>
      ))}

      </div>
      );
}

export default Article;