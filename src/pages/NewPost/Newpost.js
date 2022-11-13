import Navbar from '../../components/navbar/Navbar';
import NewPostForm from '../../components/post/NewPostForm';
import userService from '../../Services/user.service';
import React, { useState, useEffect } from 'react';
import avatarDefault from '../../Resource/Image/avatar.png';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { toast } from 'react-toastify';
const SOCKET_URL = process.env.REACT_APP_WEB_SOCKET_URL;

var stompClient = null;
const Newpost = () => {
   const [avatar, setAvatar] = useState();
   const user = JSON.parse(sessionStorage.getItem('user'));
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
      fetchUserApi();
      connect();
      return () => {
         onDisconect();
      };
   }, []);
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
               {avatar !== null ? <NewPostForm Avatar={avatar} /> : <NewPostForm Avatar={avatarDefault} />}
            </div>
         </div>
      </>
   );
};

export default Newpost;
