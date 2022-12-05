import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import EditPostComponent from '../../components/post/EditPost';
import userService from '../../Services/user.service';

const EditPost = () => {
   const [dataPost, setDataPost] = useState();
   const user = JSON.parse(localStorage.getItem('user'));
   const Id = user.userId;
   const params = useParams();
   let postID = params.postEditID;

   useEffect(() => {
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
            <Navbar />
            <div className="pt-pTopNav">
               {dataPost !== undefined ? <EditPostComponent dataPost={dataPost} /> : null}
            </div>
         </div>
      </>
   );
};

export default EditPost;
