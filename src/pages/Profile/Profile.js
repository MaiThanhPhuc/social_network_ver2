import { useEffect, useState } from 'react';
import Post from '../../components/post/Post';
import ProfileUser from '../../components/user/ProfileUser';
import Navbar from '../../components/navbar/Navbar';
import userService from '../../Services/user.service';
import InfiniteScroll from 'react-infinite-scroll-component';
import avatarDefault from '../../Resource/Image/avatar.png';
import SkeletonPost from '../../components/timeline/SkeletonPost';
import SkeletonUser from '../../components/user/SkeletonUser';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { toast } from 'react-toastify';
const SOCKET_URL = process.env.REACT_APP_WEB_SOCKET_URL;

var stompClient = null;

const Profile = () => {
   const [posts, setPosts] = useState([]);
   const [page, setPage] = useState(0);
   const [countPost, setCountPost] = useState([]);
   const [hasMore, setHasMore] = useState(true);
   const [avatar, setAvatar] = useState();
   const [user, setUser] = useState(null);
   const temp = JSON.parse(sessionStorage.getItem('user'));
   const Id = temp.userId;

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

   const fetchUserApi = async () => {
      userService
         .getUser(Id)
         .then((result) => {
            setUser(result);
            setAvatar(result.imageUrl);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const fetchPostApi = async () => {
      userService
         .getPostUser(Id, page)
         .then((res) => {
            setPosts([...posts, ...res]);
            setCountPost(res);
            setPage(page + 1);
         })
         .catch((err) => console.log(err));
   };

   const fetchData = async () => {
      fetchPostApi();
      if (countPost.length < 10) {
         setHasMore(false);
      }
      setPage(page + 1);
   };

   useEffect(() => {
      fetchPostApi();
      fetchUserApi();
      connect();
      return () => {
         onDisconect();
      };
   }, []);
   return (
      <>
         <div className="bg-gray">
            {avatar !== null ? <Navbar Avatar={avatar} /> : <Navbar Avatar={avatarDefault} />}
            <div className="pt-pTopNav">
               <div className="flex gap-4 justify-center h-full">
                  <div className="w-postWidth">
                     <InfiniteScroll
                        dataLength={posts.length} //This is important field to render the next data
                        next={fetchData}
                        hasMore={hasMore}
                        loader={<SkeletonPost posts={3} />}
                        endMessage={
                           <p className="bg-white rounded py-2 text-center mb-4">
                              <b>You have seen all post</b>
                           </p>
                        }
                     >
                        {posts.map((post, index) => (
                           <Post key={index} postData={post} />
                        ))}
                     </InfiniteScroll>
                  </div>
                  <div className="w-footerWidth">
                     {user !== null ? <ProfileUser userData={user} /> : <SkeletonUser />}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Profile;
