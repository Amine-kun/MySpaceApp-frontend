import React from 'react';
import {ImSpinner2} from 'react-icons/im';

const Spinner =({message})=> {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
          <ImSpinner2 className="w-10 h-10 text-blue-500 animate-spin"/>
          <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;