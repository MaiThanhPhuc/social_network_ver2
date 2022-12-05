import Navbar from '../../components/navbar/Navbar';
import NewPostForm from '../../components/post/NewPostForm';
import React, { useEffect } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { toast } from 'react-toastify';
const SOCKET_URL = process.env.REACT_APP_WEB_SOCKET_URL;

var stompClient = null;
const Newpost = () => {
   const user = JSON.parse(localStorage.getItem('user'));
   const Id = user.userId;

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

   const onConnected = async () => {
      await stompClient.subscribe('/notification/' + Id + '/notificationPopUp', onMessageReceived);
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
      connect();
      return () => {
         onDisconect();
      };
   }, []);

   return (
      <>
         <div className="bg-gray">
            <Navbar />
            <div className="pt-pTopNav">
               <NewPostForm />
            </div>
         </div>
      </>
   );
};

export default Newpost;
