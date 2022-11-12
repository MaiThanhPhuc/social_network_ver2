import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Newpost from '../pages/NewPost/Newpost';
import Homepage from '../pages/Homepage/Homepage';
import EditProfile from '../pages/Profile/EditProfile';
import Profile from '../pages/Profile/Profile';
import TimeLine from '../pages/Timeline/Timeline';
import NotFound from '../pages/NotFound/NotFound';
import EditProfileComponent from '../components/user/Edit_Profile';
import ChangePassword from '../components/user/Change_Password';
import FollowerUser from '../components/user/FollowerUser';
import PostPage from '../pages/PostPage/PostPage';
import EditPost from '../pages/EditPostPage/EditPost';
import SuccessVerify from '../components/signup/SuccessVerify';
import FailedVerify from '../components/signup/FailedVerify';
import Guest from '../pages/Guestpage/Guest';
import MessagePage from '../pages/MessagePage/MessagePage';
import Conversation from '../pages/MessagePage/Conversation';

const index = () => {
   return (
      <>
         <Routes>
            <Route element={<PrivateRoute />}>
               <Route path="/" element={<TimeLine />} exact />
               <Route path="/post/:postID" element={<PostPage />} exact />
               <Route path="/post/editpost/:postEditID" element={<EditPost />} exact />
               <Route path={`/user`} element={<Profile />} exact />
               <Route path={'/user/:userID'} element={<Guest />} />
               <Route path="/newpost" element={<Newpost />} exact />
               <Route exact path="accounts" element={<EditProfile />}>
                  <Route index element={<EditProfileComponent />} />
                  <Route path="changepassword" element={<ChangePassword />} />
                  <Route path="follower" element={<FollowerUser />} />
               </Route>
               <Route exact path="/guest" element={<Guest />} />
               <Route exact path="/inbox" element={<MessagePage />} />
               <Route exact path="/inbox/:receiveID" element={<Conversation />} />
            </Route>
            <Route path={'/login'} element={<Homepage />} />
            <Route path={'/confirmemailqpnetwork'} element={<SuccessVerify />} />
            <Route path={'/confirmemailfailed'} element={<FailedVerify />} />
            <Route path="*" element={<NotFound />} />
         </Routes>
      </>
   );
};

export default index;
