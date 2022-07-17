import React from 'react';
import Masonary from 'react-masonry-css';
import Pin from './Pin';

const MSL =({pins})=> {
  const breakpointObj={
    default:4,
    3000:6,
    2000:5,
    1200:3,
    1000:2,
    500:1,
  }

  return (
    <div>
       <Masonary className="flex animate-slide-fwd" breakpointCols={breakpointObj}>
          {pins?.map((pin)=><Pin key={pin._id} pins={pin} className="w-max"/>)}
       </Masonary>
    </div>
  );
}

export default MSL;