import { useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { format } from 'timeago.js';
import avatarDefault from '../../Resource/Image/avatar.png';
const API_URL = process.env.REACT_APP_BASE_URL;
const Message = ({ data }) => {
   const user = JSON.parse(localStorage.getItem('user'));
   const [showTime, setShowTime] = useState(false);
   const [showRemove, setShowRemove] = useState(false);
   const handleDeleteMessage = async () => {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${user.access_token}`);
      var requestOptions = {
         method: 'DELETE',
         headers: myHeaders,
         redirect: 'follow',
      };

      await fetch(`${API_URL}message/${data.id}`, requestOptions)
         .then(() => {
            setShowRemove(true);
         })
         .catch((error) => console.log('error', error));
   };
   const handleShowTime = () => {
      setShowTime(showTime ? false : true);
   };
   return (
      <>
         {showRemove ? (
            <div className="flex justify-end ">
               <div
                  onClick={handleShowTime}
                  className="cursor-pointer bg-grayLight px-4 py-2 rounded-[22px] w-fit max-w-[250px] break-words text-black/60 italic text-[15px]"
               >
                  You unsent a message
               </div>
            </div>
         ) : user.userId == data.senderId ? (
            <div>
               <div className="flex justify-end ">
                  <div className="dropdown dropdown-left mt-2 mr-2">
                     <label tabIndex="0" className="">
                        <button className="hover:bg-black/20 text-black/20 rounded-full">
                           <BiDotsVerticalRounded size={17} />
                        </button>
                     </label>
                     <ul tabIndex="0" className="dropdown-content menu p-1  shadow text-xs rounded-box w-fit ">
                        <li>
                           <span
                              onClick={handleDeleteMessage}
                              className="text-black active:bg-black/30 font-semibold p-1"
                           >
                              Remove
                           </span>
                        </li>
                     </ul>
                  </div>
                  <div
                     onClick={handleShowTime}
                     className="cursor-pointer bg-grayLight px-4 py-2 rounded-[22px] w-fit max-w-[250px] break-all text-black text-[15px]"
                  >
                     {data?.files === true ? <img src={data?.message} /> : null}
                     {data?.files === false ? <a href={data?.message}>File attachment</a> : null}
                     {data?.files === null ? data?.message : null}
                  </div>
               </div>

               {showTime ? (
                  <div className="flex justify-end cursor-pointer mr-1 text-[10px]">{format(data.createTime)}</div>
               ) : null}
            </div>
         ) : null}

         {user.userId != data.senderId ? (
            <div className="">
               <div className="flex w-[50%] items-center cursor-pointer">
                  <div className="avatar mr-2">
                     <div className="w-9 rounded-full">
                        <img src={data.senderAvatar === null ? data.senderAvatar : avatarDefault} alt="reveiver" />
                     </div>
                  </div>
                  <div
                     onClick={handleShowTime}
                     className=" bg-grayLight px-4 py-2 rounded-[22px] break-all  w-fit text-black text-[15px]"
                  >
                     {data?.files === true ? <img src={data?.message} /> : null}
                     {data?.files === false ? <a href={data?.message}>File attachment</a> : null}
                     {data?.files === null ? data?.message : null}
                  </div>
               </div>
               {showTime ? <div className="cursor-pointer ml-12 text-[10px]">{format(data.createTime)}</div> : null}
            </div>
         ) : null}
      </>
   );
};

export default Message;
