import React, {useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Feed from '../Components/Feed';
import PinsDetails from '../Components/PinsDetails';
import ArticleDetails from '../Components/ArticleDetails';
import CreatePin from '../Components/CreatePin';
import Search from '../Components/Search';


const Pins =({user})=> {
   const [searchTerm, setSearchTerm] = useState('')
  return (
    <div className="px-2 md:px-5">
      <div className="bg-grey-50">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user} />
      </div>
      <div className="h-full">
          <Routes>
            <Route path="/*" element={<Feed user={user}/>}/>
            <Route path="/category/:categoryId" element={<Feed/>}/>
            <Route path="/post/:pinId" element={<PinsDetails user={user}/>}/>
            <Route path="/article/:articleId" element={<ArticleDetails user={user}/>}/>
            <Route path="/create-pin" element={<CreatePin user={user} />}/>
            <Route path="/Search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>}/>
          </Routes>
      </div>
    </div>
  );
}

export default Pins;