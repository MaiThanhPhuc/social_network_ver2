import React, { useEffect, useState, memo } from 'react';
import Footer from '../../components/footer/Footer';
import Post from '../../components/post/Post';
import { HiOutlinePhotograph } from 'react-icons/hi';
import Navbar from '../../components/navbar/Navbar';
import { Link } from 'react-router-dom';
import userService from '../../Services/user.service';
import InfiniteScroll from 'react-infinite-scroll-component';
import avatarDefault from '../../Resource/Image/avatar.png';
import { toast } from 'react-toastify';
import SkeletonPost from '../../components/timeline/SkeletonPost';
import Topten from '../../components/timeline/Topten';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
var stompClient = null;
const TimeLine = () => {
   const [posts, setPosts] = useState([]);
   const [page, setPage] = useState(0);
   const [countPost, setCountPost] = useState([]);
   const [hasMore, setHasMore] = useState(true);
   const user = JSON.parse(localStorage.getItem('user'));
   const Id = user.userId;
   const [avatar, setAvatar] = useState();

   const connect = () => {
      let Sock = new SockJS('https://socialnetwork999.herokuapp.com/ws');
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

   const fetchUserApi = async () => {
      userService
         .getUser(Id)
         .then((result) => {
            setAvatar(result.imageUrl);
            localStorage.setItem('userName', result.lastName + ' ' + result.firstName);
            localStorage.setItem('userImgUrl', result.imageUrl);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   useEffect(() => {
      fetchPostApi();
      fetchUserApi();
      connect();
      console.log('lan 1');
      return () => {
         console.log('disconet');

         onDisconect();
      };
   }, []);

   const fetchPostApi = async () => {
      userService
         .getPostHomePage(Id, page)
         .then((res) => {
            setPosts([...posts, ...res]);
            setCountPost(res);
            setPage(page + 1);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const fetchData = async () => {
      fetchPostApi();
      if (countPost.length < 10) {
         setHasMore(false);
      }
      setPage(page + 1);
   };

   return (
      <>
         <div className="bg-gray">
            {avatar !== null ? <Navbar Avatar={avatar} /> : <Navbar Avatar={avatarDefault} />}
            <div className="pt-pTopNav">
               <div className="flex gap-4 justify-center h-full">
                  <div className="w-postWidth">
                     {/* btn new post */}
                     <div className="newpost-btn bg-white flex p-3 gap-2 mb-3 rounded">
                        <button className="avatar">
                           <div className="w-9 rounded-full">
                              <img src={avatar !== null ? avatar : avatarDefault} alt="Avatar" />
                           </div>
                        </button>
                        <Link
                           to="/newpost"
                           className="newpost-box text-left outline outline-1 outline-grayLight w-full pt-2 rounded bg-grayLight pl-3 text-sm text-bodytxt/50 font-semibold hover:cursor-text hover:outline-primaryblue hover:bg-white"
                        >
                           Create Post
                        </Link>
                        <Link
                           to="/newpost"
                           className="text-2xl text-bodytxt/70 px-2 hover:bg-grayLight rounded flex justify-center items-center"
                        >
                           <HiOutlinePhotograph />
                        </Link>
                     </div>
                     {/* btn */}

                     {/* <InfiniteScroll
                dataLength={posts.length} //This is important field to render the next data
                next={fetchData}
                hasMore={hasMore}
                loader={<SkeletonPost posts={2} />}
                endMessage={
                  <p className="bg-white rounded py-2 text-center mb-4">
                    <b>You have seen all post</b>
                  </p>
                }
              >
                {posts.map((post, index) => (
                  <Post
                    key={index}
                    postData={post}
                    posts={posts}
                    setPosts={setPosts}
                    stompClient={stompClient}
                  />
                ))}
              </InfiniteScroll> */}
                  </div>
                  <div className="w-footerWidth ">
                     <div className="fixed w-footerWidth">
                        <Topten />
                        <Footer />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default memo(TimeLine);
