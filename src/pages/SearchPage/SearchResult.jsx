import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Post from '../../components/post/Post';
import Navbar from '../../components/navbar/Navbar';
import userService from '../../Services/user.service';
import { toast } from 'react-toastify';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient = null;
const SOCKET_URL = process.env.REACT_APP_WEB_SOCKET_URL;
function useQuery() {
   const { search } = useLocation();

   return React.useMemo(() => new URLSearchParams(search), [search]);
}
const SearchResult = () => {
   const [dataPost, setDataPost] = useState();
   const user = JSON.parse(localStorage.getItem('user'));
   const Id = user.userId;
   let query = useQuery();
   let key = query.get('key');
   const connect = () => {
      let Sock = new SockJS(SOCKET_URL);
      stompClient = over(Sock);
      stompClient.connect({}, onConnected);
   };

   const onDisconect = () => {
      if (stompClient.counter !== 0) {
         stompClient.disconnect(() => {
            stompClient.unsubscribe('sub-0');
         }, {});
      }
   };

   const onConnected = () => {
      stompClient.subscribe('/notification/' + Id + '/notificationPopUp', onMessageReceived);
   };
   const onMessageReceived = (payload) => {
      var payloadData = JSON.parse(payload.body);
      toast(payloadData.content, {
         autoClose: 1000,
         theme: 'dark',
         position: 'bottom-center',
      });
   };

   useEffect(() => {
      const fetchSearchPost = async () => {
         await userService
            .searchPost(key)
            .then((res) => {
               if (res) {
                  setDataPost(res);
               }
            })
            .catch((err) => {
               console.log(err);
            });
      };
      connect();
      fetchSearchPost();
      return () => {
         onDisconect();
      };
   }, [key]);

   return (
      <>
         <div className="bg-gray">
            <Navbar />
            <div className="pt-pTopNav">
               <div className="flex gap-4 justify-center h-full">
                  <div className="w-postWidth">
                     <div className="w-postWidth">
                        {dataPost?.length > 0 ? (
                           dataPost.map((item) => <Post postData={item} />)
                        ) : (
                           <p className="bg-white rounded py-2 text-center mb-4">Not found</p>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default SearchResult;
