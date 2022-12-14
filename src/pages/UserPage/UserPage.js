import { useEffect, useState } from 'react';
import Post from '../../components/post/Post';
import Navbar from '../../components/navbar/Navbar';
import userService from '../../Services/user.service';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import SkeletonPost from '../../components/timeline/SkeletonPost';
import SkeletonUser from '../../components/user/SkeletonUser';
import ProfileUser from '../../components/user/ProfileUser';
const SOCKET_URL = process.env.REACT_APP_WEB_SOCKET_URL;

var stompClient = null;

const UserPage = () => {
   const [posts, setPosts] = useState([]);
   const [page, setPage] = useState(0);
   const [countPost, setCountPost] = useState([]);
   const [hasMore, setHasMore] = useState(true);
   const [user, setUser] = useState(null);
   const [guest, setGuest] = useState();
   const temp = JSON.parse(localStorage.getItem('user'));
   const Id = temp.userId;
   const params = useParams();
   let guestID = params.userID;
   const connect = () => {
      let Sock = new SockJS(SOCKET_URL);
      stompClient = over(Sock);
      stompClient.connect({}, onConnected);
   };

   const onConnected = async () => {
      await stompClient.subscribe('/notification/' + Id + '/notificationPopUp', onMessageReceived);
   };
   const onDisconect = async () => {
      if (stompClient.counter !== 0) {
         await stompClient.disconnect(() => {
            stompClient.unsubscribe('sub-0');
         }, {});
      }
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
      setGuest(guestID);
      setPosts([]);
      setCountPost([]);
      setPage(0);
      setUser(null);
      setHasMore(true);
      connect();
      return () => {
         onDisconect();
         setGuest(guestID);
         setPosts([]);
         setCountPost([]);
         setPage(0);
         setUser(null);
         setHasMore(true);
      };
   }, [guestID]);

   useEffect(() => {
      fetchPostApi();
      fetchUserApi();
   }, [guest]);

   const fetchUserApi = async () => {
      userService
         .getGuest(Id, guestID)
         .then((result) => {
            setUser(result);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const fetchPostApi = async () => {
      userService
         .getPostGuest(guestID, page, Id)
         .then((res) => {
            if (res.length === 0) {
               setHasMore(false);
            }
            setPosts([...posts, ...res]);
            setCountPost(res);
            setPage(page + 1);
         })
         .catch((err) => console.log(err));
   };

   const fetchData = async () => {
      fetchPostApi();
      if (countPost.length < 10 || countPost.length === 0) {
         setPage(0);
         setHasMore(false);
      }
      setPage(page + 1);
   };

   return (
      <>
         <div className="bg-gray">
            <Navbar />
            <div className="pt-pTopNav">
               <div className="flex gap-4 justify-center h-full">
                  <div className="w-postWidth">
                     <InfiniteScroll
                        dataLength={posts.length} //This is important field to render the next data
                        next={fetchData}
                        hasMore={hasMore}
                        loader={<SkeletonPost posts={4} />}
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
                     {user !== null ? <ProfileUser stompClient={stompClient} userData={user} /> : <SkeletonUser />}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default UserPage;
