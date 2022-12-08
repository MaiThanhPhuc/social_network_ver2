import { useEffect, useState } from 'react';
import MessageBox from '../../components/message/MessageBox';
import Navbar from '../../components/navbar/Navbar';
import { BiMessageRoundedAdd } from 'react-icons/bi';
import UserItems from '../../components/message/UserItems';
import userService from '../../Services/user.service';
import NewMessageUser from '../../components/message/NewMessageUser';
import SkeletonUserMessage from '../../components/message/SkeletonUserMessage';
import NoneConversation from '../../components/message/NoneConversation';
import { useParams } from 'react-router-dom';

const Conversation = () => {
   const user = JSON.parse(localStorage.getItem('user'));
   const [usersFollow, setUsersFollow] = useState([]);
   const [listUser, setListUser] = useState([]);
   const [loadingFollow, setLoadingFollow] = useState(false);
   const [loading, setLoading] = useState(false);
   const [isMessage, setIsMessage] = useState(false);
   const Id = user.userId;
   const params = useParams();
   let receiverID = params.receiveID;

   useEffect(() => {
      console.log(receiverID);
      if (!!receiverID) {
         setIsMessage(true);
      }
      fetchListHistoryMessage();
      return () => {
         setIsMessage(true);
      };
   }, []);

   const fetchUserFollowing = () => {
      setLoadingFollow(true);
      userService
         .getFollowing(user.userId)
         .then((res) => {
            setLoadingFollow(false);
            setUsersFollow(res.data.data);
         })
         .catch((err) => {
            setLoadingFollow(false);
            console.log(err);
         });
   };

   const fetchListHistoryMessage = () => {
      setLoading(true);
      userService
         .getConversation(Id)
         .then((res) => {
            setLoading(false);
            if (res.status === 200) {
               setListUser(res.data.data);
            }
         })
         .catch((err) => {
            setLoading(false);
            console.log(err);
         });
   };

   return (
      <>
         <div className="bg-gray">
            <Navbar />
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
                                    <h3 className=" font-medium  mx-2 my-1">List following</h3>
                                    <span className=" w-full mb-1 h-1 border-b border-grayLight"></span>
                                    {!loadingFollow ? (
                                       usersFollow?.map((data, index) => (
                                          <NewMessageUser key={index} dataUser={data} setIsMessage={setIsMessage} />
                                       ))
                                    ) : (
                                       <SkeletonUserMessage users={4} />
                                    )}
                                 </ul>
                              </div>
                           </div>
                        </div>
                        <div className=" border-b border-black/20"></div>
                        <div className="list-user rounded">
                           {!loading ? (
                              listUser?.map((data, index) => (
                                 <UserItems key={index} dataUser={data} setIsMessage={setIsMessage} />
                              ))
                           ) : (
                              <SkeletonUserMessage users={2} />
                           )}
                        </div>
                     </div>
                     {isMessage ? <MessageBox receiverID={receiverID} /> : <NoneConversation />}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Conversation;
