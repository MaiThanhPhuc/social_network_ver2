import { useEffect, useState } from 'react';
import avatarDefault from '../../Resource/Image/avatar.png';
import { useLocation, useNavigate } from 'react-router-dom';

const UserItems = ({ dataUser, setIsMessage }) => {
   const [activeIndex, setActiveIndex] = useState(false);
   const location = useLocation();
   const navigate = useNavigate();

   useEffect(() => {
      const curPath = window.location.pathname.split('/inbox/')[1];
      if (curPath) setActiveIndex(parseInt(curPath) === dataUser.id ? true : false);
      else {
         setIsMessage(false);
      }
   }, [location]);

   const handleSelectUser = () => {
      setIsMessage(true);
      navigate(`/inbox/${dataUser.id}`, { replace: true });
   };
   return (
      <>
         {dataUser !== undefined ? (
            <div
               onClick={handleSelectUser}
               className={`user-item cursor-pointer flex items-cente rounded px-4 py-2 ${
                  activeIndex ? 'bg-grayLight' : 'hover:bg-grayLight'
               } `}
            >
               <button className="avatar">
                  <div className="w-12 rounded-full">
                     <img src={dataUser.avatar != null ? dataUser.avatar : avatarDefault} alt="avatar" />
                  </div>
               </button>
               <div className="box-left flex flex-col ml-2">
                  <span className="user-name text-black font-semibold ">
                     {dataUser.lastName + ' ' + dataUser.firstName}
                  </span>
                  <span className="text-grayText text-xs font-semibold">{dataUser.email}</span>
               </div>
            </div>
         ) : null}
      </>
   );
};

export default UserItems;
