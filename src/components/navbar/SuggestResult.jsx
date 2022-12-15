import { useEffect, useState, useRef } from 'react';

import Account from './Account';
import SkeletonSeach from './SkeletonSeach';

const SuggestResult = ({ searchResult }) => {
   const [clickedOutside, setClickedOutside] = useState(false);
   const myRef = useRef();

   const handleClickOutside = (e) => {
      if (!myRef?.current?.contains(e.target)) {
         setClickedOutside(true);
      }
   };
   useEffect(() => {
      setClickedOutside(false);
   }, [searchResult]);

   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
   });

   return (
      <>
         {searchResult && !clickedOutside ? (
            <div
               ref={myRef}
               className="absolute shadow bg-grayLight z-40 w-full top-[40px] lef-0 rounded max-h-[400px] overflow-y-auto "
            >
               <div className=" flex flex-col w-full">
                  {searchResult.map((res, index) => (
                     <Account key={index} data={res} />
                  ))}
               </div>
            </div>
         ) : null}
      </>
   );
};

export default SuggestResult;
