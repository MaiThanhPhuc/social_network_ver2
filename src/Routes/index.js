import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Newpost from '../pages/NewPost/Newpost';
import Homepage from '../pages/Homepage/Homepage';
import EditProfile from '../pages/Profile/EditProfile';
import TimeLine from '../pages/Timeline/Timeline';
import MessagePage from '../pages/MessagePage/MessagePage';
import NotFound from '../pages/NotFound/NotFound';
import EditProfileComponent from '../components/user/Edit_Profile';
import ChangePassword from '../components/user/Change_Password';
import FollowerUser from '../components/user/FollowerUser';
import AdminPage from '../pages/AdminPage/AdminPage';
import Dashboard from '../components/admin/Dashboard';
import UserManagement from '../components/admin/UserManagement';
import PostManagement from '../components/admin/PostManagement';
import AdminRoute from './AdminRoute';
import PostPage from '../pages/PostPage/PostPage';
import EditUserAdmin from '../components/admin/EditUserAdmin';
import ReportPost from '../components/admin/ReportPost';
import ReportUser from '../components/admin/ReportUser';
import EditPost from '../pages/EditPostPage/EditPost';
import SuccessVerify from '../components/signup/SuccessVerify';
import FailedVerify from '../components/signup/FailedVerify';
import UserPage from '../pages/UserPage/UserPage';
import SearchResult from '../pages/SearchPage/SearchResult';

const index = () => {
   return (
      <>
         <Routes>
            <Route element={<PrivateRoute />}>
               <Route path="/" element={<TimeLine />} exact />
               <Route path="/post/:postID" element={<PostPage />} exact />
               <Route path="/post/editpost/:postEditID" element={<EditPost />} exact />
               <Route path={'/user/:userID'} element={<UserPage />} />
               <Route path="/newpost" element={<Newpost />} exact />
               <Route path="/search" element={<SearchResult />} exact />
               <Route element={<AdminRoute />}>
                  <Route exact path="admin" element={<AdminPage />}>
                     <Route index element={<Dashboard />} />
                     <Route path="user" element={<UserManagement />} />
                     <Route path="posts" element={<PostManagement />} />
                     <Route path="report/posts" element={<ReportPost />} />
                     <Route path="report/users" element={<ReportUser />} />
                     <Route path="user/:ID" element={<EditUserAdmin />} />
                  </Route>
               </Route>

               <Route exact path="accounts" element={<EditProfile />}>
                  <Route index element={<EditProfileComponent />} />
                  <Route path="changepassword" element={<ChangePassword />} />
                  <Route path="follower" element={<FollowerUser />} />
               </Route>
               <Route exact path="/guest" element={<UserPage />} />
               <Route exact path="/inbox" element={<MessagePage />} />
               <Route exact path="/inbox/:receiveID" element={<MessagePage />} />
            </Route>
            <Route path={'/login'} element={<Homepage />} />
            <Route path={'/oauth2/redirect'} element={<Homepage />} />
            <Route path={'/confirmemailqpnetwork'} element={<SuccessVerify />} />
            <Route path={'/confirmemailfailed'} element={<FailedVerify />} />
            <Route path="*" element={<NotFound />} />
         </Routes>
      </>
   );
};

export default index;
