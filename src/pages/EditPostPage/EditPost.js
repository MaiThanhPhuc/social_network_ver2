import Navbar from '../../components/navbar/Navbar';
import EditPostComponent from '../../components/post/EditPost';
import userService from '../../Services/user.service';
import React, { useState, useEffect } from 'react';
import avatarDefault from '../../Resource/Image/avatar.png';
import { useParams } from 'react-router-dom';

const EditPost = () => {
   const [avatar, setAvatar] = useState();
   const [dataPost, setDataPost] = useState();
   const user = JSON.parse(sessionStorage.getItem('user'));
   const Id = user.userId;
   const params = useParams();
   let postID = params.postEditID;

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
   useEffect(() => {
      fetchUserApi();
      fetchPostData();
   }, []);

   const fetchPostData = async () => {
      userService
         .getPostID(Id, postID)
         .then((result) => {
            setDataPost(result);
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
               {dataPost !== undefined ? (
                  avatar !== null ? (
                     <EditPostComponent Avatar={avatar} dataPost={dataPost} />
                  ) : (
                     <EditPostComponent Avatar={avatarDefault} dataPost={dataPost} />
                  )
               ) : null}
            </div>
         </div>
      </>
   );
};

export default EditPost;
