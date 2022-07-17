import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {client} from '../client';
import {searchQuery, feedQuery, feedQueryForArticles} from '../UtilityFunctions/data';
import MSL from './MSL';
import Article from './Article';
import Spinner from './Spinner';


const activeBtnStyles = "bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

const Feed =({user})=> {
   const [text, setText]=useState('Posts');
   const [activeBtn, setActiveBtn]=useState('posts');
   const [loading, setLoading] = useState(false);
   const [articles, setArticles] = useState(null);
   const [pins, setPins] = useState(null);
   const {categoryId} = useParams();
   useEffect(()=>{
      setLoading(true);
              if(categoryId) {
                  const query = searchQuery(categoryId);
                  client.fetch(query)
                  .then((data)=>{
                    setPins(data);
                    setLoading(false);
                  })
            } else {
                client.fetch(feedQuery)
                .then((data)=>{
                  setPins(data);
                  setLoading(false);
                })}
   },[categoryId])

    const loadArticles = () => {
       setLoading(true);
      client.fetch(feedQueryForArticles)
                .then((data)=>{
                  setArticles(data);
                  setLoading(false);
                  console.log(data.image.asset.url);
                })
    }


    if(loading) return <Spinner message="Loading Feed..."/>
  return (
    <div>
      <div className="flex flex-row justify-center mb-4 ">
              <button type="button" 
                      onClick={(e)=>{setText(e.target.textContent); setActiveBtn('posts');}}
                      className={`${activeBtn==='posts' ? activeBtnStyles : notActiveBtnStyles}`}>
                      Posts
              </button>
              <button type="button" 
                      onClick={(e)=>{setText(e.target.textContent); setActiveBtn('articles'); loadArticles();}}
                      className={`${activeBtn==='articles' ? activeBtnStyles : notActiveBtnStyles}`}>
                      Articles
              </button>
      </div>
      { activeBtn==='posts'
          ? (pins === null || pins.length === 0 
                     ? <div className="font-bold bg-white flex justify-center items-center py-20 text-gray-500 rounded-lg"> No posts in this catergorie yet.  </div>
                      : <MSL pins={pins}/>)
          : (pins === null || pins.length === 0 
                     ? <div className="font-bold bg-white flex justify-center items-center py-20 text-gray-500 rounded-lg"> No Articles in this section.  </div>
                      : <Article articles={articles} user={user}/>)}
    </div>
  );
}

export default Feed;