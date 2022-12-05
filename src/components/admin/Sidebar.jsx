import { useEffect } from 'react';
import { AiOutlineDashboard, AiOutlineUser } from 'react-icons/ai';
import { TbReportAnalytics } from 'react-icons/tb';
import { BsFilePostFill } from 'react-icons/bs';
import { MdOutlineExitToApp, MdOutlineHome } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import avatarDefault from '../../Resource/Image/avatar.png';
import authService from '../../Services/auth.service';
import { toast } from 'react-toastify';

const sidebarItems = [
   {
      display: 'Dashboard',
      icons: <AiOutlineDashboard />,
      section: '',
      active: true,
   },
   {
      display: 'User',
      icons: <AiOutlineUser />,
      section: 'user',
      active: false,
   },
   {
      display: 'Post',
      icons: <BsFilePostFill />,
      section: 'posts',
      active: false,
   },
   {
      display: 'Report Posts',
      icons: <TbReportAnalytics />,
      section: 'report/posts',
      active: false,
   },
   {
      display: 'Report Users',
      icons: <TbReportAnalytics />,
      section: 'report/users',
      active: false,
   },
];

const Sidebar = ({ dataAdmin }) => {
   const navigate = useNavigate();
   const handleSignOut = () => {
      toast('See you later!', {
         position: 'bottom-center',
         autoClose: 3000,
         theme: 'dark',
      });
      authService.logout();
      window.location.href = '/login';
   };
   const handleNavigate = (item) => {
      sidebarItems.forEach((temp) => {
         if (temp !== item) {
            temp.active = false;
         } else {
            item.active = true;
         }
      });
      navigate(`/admin/${item.section}`, { replace: true });
   };
   return (
      <div
         className="h-screen w-[250px] bg-[#93B5C6] border-r border-black/10 fixed top-0
    left-0 "
      >
         <div className="menu-edit-user flex flex-col p-2 gap-4">
            <div className="heading font-bold cursor-pointer text-xl text-center py-6 text-black ">
               Admin Management
            </div>
            <div className="menu-items flex flex-col gap-4 px-4 shadow bg-white py-4 rounded">
               {sidebarItems.map((item, index) => (
                  <span
                     key={index}
                     onClick={() => handleNavigate(item)}
                     className={`flex p-3 items-center w-full rounded-xl gap-2 cursor-pointer  ${
                        item.active ? 'bg-black text-white' : 'text-black hover:bg-grayLight'
                     }  `}
                  >
                     <span className="text-xl ">{item.icons}</span>
                     <span className="font-semibold text-base">{item.display}</span>
                  </span>
               ))}
            </div>
            <div className="bottom flex flex-col items-center mt-1 bg-white shadow py-4 rounded ">
               <div className="avatar">
                  <div className="w-24 rounded-full">
                     <img alt="avatar" src={dataAdmin.imageUrl !== null ? dataAdmin.imageUrl : avatarDefault} />
                  </div>
               </div>
               <div className=" text-lg font-semibold text-black">{dataAdmin.lastName + ' ' + dataAdmin.firstName}</div>
               <div className=" text-sm font-semibold text-black/50 mb-8 mt-2">{dataAdmin.email}</div>
               <div className="flex gap-6 ">
                  <Link to={'/'} className="p-2 hover:bg-gray rounded text-xl border border-black/20">
                     <MdOutlineHome />
                  </Link>
                  <button onClick={handleSignOut} className="p-2 hover:bg-gray rounded text-xl border border-black/20">
                     <MdOutlineExitToApp />
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};
export default Sidebar;
