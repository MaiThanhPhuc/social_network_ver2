import { useEffect, useState } from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import userService from '../../Services/user.service';
import avatarDefault from '../../Resource/Image/avatar.png';
const sidebarItems = [
   {
      display: 'Edit Profile',
      to: '/accounts',
      section: '',
   },
   {
      display: 'Change Password',
      to: 'changepassword',
      section: '/changepassword',
   },
   {
      display: 'Follower',
      to: 'follower',
      section: '/follower',
   },
   {
      display: 'Help',
      to: '/',
      section: 'help',
   },
];
const EditProfile = () => {
   const [user, setUser] = useState(null);
   const [avatar, setAvatar] = useState();
   const [reload, setReload] = useState(false);
   const [activeIndex, setActiveIndex] = useState(0);
   const location = useLocation();
   const temp = JSON.parse(localStorage.getItem('user'));
   const Id = temp.userId;

   useEffect(() => {
      const curPath = window.location.pathname.split('/accounts')[1];
      const activeItem = sidebarItems.findIndex((item) => item.section === curPath);
      setActiveIndex(curPath.length === 0 ? 0 : activeItem);
   }, [location]);

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

   useEffect(() => {
      fetchUserApi();
   }, []);

   useEffect(() => {
      fetchUserApi();
   }, [reload]);

   return (
      <>
         <div className="bg-gray">
            {avatar !== null ? <Navbar Avatar={avatar} /> : <Navbar Avatar={avatarDefault} />}
            <div className="pt-pTopNav">
               <div className=" grid grid-cols-10 gap-4  ">
                  <div className="col-span-2"></div>
                  <div className="col-span-6">
                     <div className="bg-white rounded pb-1 ">
                        <div className="grid grid-cols-8 ">
                           <div className="menu-edit-user col-span-2 border-r border-black/20  ">
                              <ul className=" space-y-2 w-full">
                                 {sidebarItems.map((item, index) => (
                                    <li key={index}>
                                       <Link
                                          to={item.to}
                                          className={`pl-7 py-4 block hover:bg-grayLight/50 border-l-2 hover:border-black/20 ${
                                             activeIndex === index
                                                ? 'boder-black bg-grayLight font-semibold'
                                                : 'border-transparent'
                                          }  `}
                                       >
                                          {item.display}
                                       </Link>
                                    </li>
                                 ))}
                              </ul>
                           </div>
                           <div className="col-span-6 flex flex-col gap-6">
                              {user !== null ? <Outlet context={[user, setReload]} /> : null}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default EditProfile;
