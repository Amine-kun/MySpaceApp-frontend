import React, {useState, useEffect} from 'react';
import {searchQuery, feedQuery} from '../UtilityFunctions/data';
import MSL from './MSL';
import Spinner from './Spinner';
import {client} from '../client';

const Search =({searchTerm,setSearchTerm})=> {
    const [pins, setPins]=useState(null);
    const [loading, setLoading]=useState(false);

    useEffect(()=>{
        if(searchTerm){
          setLoading(true);
          const query = searchQuery(searchTerm.toLowerCase());

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
            })
        }
    },[searchTerm])

  return (
    <div>
      {loading && <Spinner message="Searching..."/>}
      {pins?.length !== 0 && <MSL pins={pins}/>}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
          <div className="font-bold bg-white flex justify-center items-center py-20 text-gray-500 rounded-lg">
           No posts found.
           </div>
        )}
    </div>
  );
}

export default Search;