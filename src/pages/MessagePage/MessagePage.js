import { useEffect, useState } from 'react';
import MessageBox from '../../components/message/MessageBox';
import Navbar from '../../components/navbar/Navbar';
import avatarDefault from '../../Resource/Image/avatar.png';
import { BiMessageRoundedAdd } from 'react-icons/bi';
import NoneConversation from '../../components/message/NoneConversation';
import UserItems from '../../components/message/UserItems';
import userService from '../../Services/user.service';
import NewMessageUser from '../../components/message/NewMessageUser';

const MessagePage = () => {
   const [avatar, setAvatar] = useState();
   const user = JSON.parse(localStorage.getItem('user'));
   const [users, setUsers] = useState([]);

   const [listUser, setListUser] = useState([]);
   const Id = user.userId;

   useEffect(() => {
      fetchUserApi();
      fetchListHistoryMessage();
      fetchUserFollowing();
   }, []);

   const fetchUserFollowing = () => {
      userService
         .getFollowing(user.userId)
         .then((res) => {
            setUsers(res.data.data);
         })
         .catch((err) => console.log(err));
   };

   const fetchListHistoryMessage = () => {
      userService
         .getConversation(Id)
         .then((res) => {
            setListUser(res.data.data);
         })
         .catch((err) => console.log(err));
   };

   const fetchUserApi = async () => {
      userService
         .getUser(Id)
         .then((result) => {
            setAvatar(result.imageUrl);
         })
         .catch((err) => {
            console.log(err);
         });
   };
   return (
      <>
         <div className="bg-gray">
            {avatar !== null ? <Navbar Avatar={avatar} /> : <Navbar Avatar={avatarDefault} />}
            <div className="pt-pTopNav">
               <div className="flex justify-center">
                  <div className="bg-white w-messageWidth h-messHeight rounded-lg shadow-sm  border border-black/10 grid grid-cols-8 mr-12">
                     <div className="col-span-3 border-r border-black/10 ">
                        <div className="heading-message px-4 py-4 flex flex-col gap-2 mb-2">
                           <div className="heading flex items-center justify-between">
                              <h1 className=" font-semibold text-xl ">Message</h1>
                              <div className="dropdown">
                                 <label tabIndex="0">
                                    <div
                                       onClick={fetchUserFollowing}
                                       className="new-chat text-2xl text-primaryblue cursor-pointer"
                                    >
                                       <BiMessageRoundedAdd />
                                    </div>
                                 </label>
                                 <ul
                                    tabIndex="0"
                                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-[300px] h-[300px] overflow-y-auto max-h-[500px]"
                                 >
                                    {users[0] !== undefined
                                       ? users.map((data, index) => <NewMessageUser key={index} dataUser={data} />)
                                       : null}
                                 </ul>
                              </div>
                           </div>
                        </div>
                        <div className=" border-b border-black/20"></div>
                        <div className="list-user rounded">
                           {listUser !== undefined ? (
                              listUser.map((data, index) => <UserItems key={index} dataUser={data} />)
                           ) : (
                              <div>Let's connect to your friend</div>
                           )}
                        </div>
                     </div>
                     <NoneConversation />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default MessagePage;
