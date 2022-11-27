import { useEffect, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMessage } from 'react-icons/ai';
import { BiSearch, BiLogOutCircle, BiUserCircle } from 'react-icons/bi';
import { RiUserSettingsLine } from 'react-icons/ri';
import { FiPlusSquare } from 'react-icons/fi';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { IoNotificationsOutline } from 'react-icons/io5';
import InfiniteScroll from 'react-infinite-scroll-component';
import logo from '../../Resource/Image/logo.png';
import userService from '../../Services/user.service';
import authService from '../../Services/auth.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Account from './Account';
import Notification from './Notification';
import SkeletonSeach from './SkeletonSeach';
const API_URL = process.env.REACT_APP_BASE_URL;

const Navbar = ({ Avatar }) => {
   const [noti, setNoti] = useState(true);
   const [notiData, setNotiData] = useState([]);
   const [page, setPage] = useState(0);
   const [hasMore, setHasMore] = useState(true);
   const [countNoti, setCountNoti] = useState([]);
   const [searchValue, setSearchValue] = useState('');
   const [searchResult, setSearchResult] = useState([]);
   const user = JSON.parse(localStorage.getItem('user'));
   const Id = user.userId;

   const handleSignOut = () => {
      toast('See you later!', {
         position: 'bottom-center',
         autoClose: 3000,
         theme: 'dark',
      });
      authService.logout();
      window.location.href = '/login';
   };

   const fetchDataNoti = () => {
      userService
         .getNotification(Id, page)
         .then((res) => {
            setNotiData([...notiData, ...res]);
            setCountNoti(res);
            setPage(page + 1);
            if (res[0] !== undefined) {
               setNoti(res[0].seen);
            }
         })
         .catch((err) => console.log(err));
   };

   const handleNotification = () => {
      setNotiSeenApi();
   };

   useEffect(() => {
      fetchDataNoti();
   }, []);

   const setNotiSeenApi = () => {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${user.access_token}`);

      var requestOptions = {
         method: 'PUT',
         headers: myHeaders,
         redirect: 'follow',
      };

      fetch(`${API_URL}notification/setSeen?notificationId=${notiData[0].id}`, requestOptions)
         .then(() => setNoti(true))
         .catch((error) => console.log('error', error));
   };

   const fetchData = () => {
      fetchDataNoti();
      if (countNoti.length < 10) {
         setHasMore(false);
      }
      setPage(page + 1);
   };

   const fetchDataSearch = () => {
      userService
         .searchUser(searchValue)
         .then((res) => {
            setSearchResult(res);
         })
         .catch((err) => console.log(err));
   };

   useEffect(() => {
      if (searchValue.trim() !== '') {
         fetchDataSearch();
      }
   }, [searchValue]);

   return (
      <>
         <nav className="flex items-center py-1 px-16 justify-evenly bg-white fixed w-full top-0 z-20 border-b border-black/20 ">
            <Link to="/" className="wrapper-right flex items-center cursor-pointer">
               <img src={logo} alt="Logo" className="w-[200px]" />
            </Link>
            <form className="relative bg-grayLight wrapper-middle outline outline-[#000]/20 outline-1 h-8 w-[300px] flex hover:outline-primaryblue focus-within:outline-primaryblue rounded ">
               <div className="pl-4 pr-3 flex justify-center items-center ">
                  <BiSearch color="#878A8C" size={25} />
               </div>
               <input
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-2 w-full outline-none text-[14px] bg-grayLight text-bodytxt focus:bg-white "
                  type="text"
                  placeholder="Search name social"
               ></input>
               {/* Suggest modal */}
               {searchValue !== '' ? (
                  <div className="absolute shadow bg-grayLight z-40 w-full top-[40px] lef-0 rounded max-h-[400px] overflow-y-auto ">
                     <div className=" flex flex-col w-full">
                        {searchResult !== null ? (
                           searchResult.map((res, index) => <Account key={index} data={res} />)
                        ) : (
                           <SkeletonSeach users={4} />
                        )}
                     </div>
                  </div>
               ) : null}

               {/* End suggest */}
            </form>

            <div className="wrapper-left flex justify-between w-[200px] items-center">
               <div className="flex items-end justify-end">
                  <Link to="/newpost" className="btn btn-sm btn-primary text-white gap-1 text-xs">
                     <FiPlusSquare size={18} /> Create
                  </Link>
               </div>
               <div className="dropdown dropdown-end">
                  <label tabIndex="0" className=" indicator m-1">
                     <button onClick={handleNotification} className="">
                        <span
                           className={!noti ? 'right-2 top-[5px] indicator-item badge badge-accent badge-xs' : null}
                        ></span>
                        <IoNotificationsOutline size={25} />
                     </button>
                  </label>
                  <ul
                     tabIndex="0"
                     className="dropdown-content shadow-lg border border-black/10 bg-base-100 rounded w-[300px] p-1"
                  >
                     <div className="heading text-[17px] px-3 py-2  font-medium border-b border-black/10">
                        Notification
                     </div>

                     <InfiniteScroll
                        dataLength={notiData.length} //This is important field to render the next data
                        next={fetchData}
                        hasMore={hasMore}
                        height={250}
                        loader={<SkeletonSeach users={4} />}
                        endMessage={
                           <p className="text-center py-1 text-black/40 text-sm font-semibold">No more notification</p>
                        }
                     >
                        {notiData !== null
                           ? notiData.map((data, index) => <Notification key={index} data={data} />)
                           : null}
                     </InfiniteScroll>
                  </ul>
               </div>

               <Link to={'/inbox'} className="mb-[2px]">
                  <AiOutlineMessage size={25} />
               </Link>

               <div className="dropdown dropdown-end mt-1">
                  <label tabIndex="0">
                     <button className="avatar">
                        <div className="w-8 rounded-full">
                           <img src={Avatar} alt="avatar" />
                        </div>
                     </button>
                  </label>
                  <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-white rounded-box w-40 text-base">
                     <li>
                        <Link to={`/user`} className=" text-sm active:bg-primaryblue/50 p-2 text-black">
                           <BiUserCircle size={18} /> My wall
                        </Link>
                     </li>
                     <li>
                        <Link to="/accounts" className=" text-sm active:bg-primaryblue/50 p-2 text-black">
                           <RiUserSettingsLine size={18} /> Edit profile
                        </Link>
                     </li>
                     {user.role !== 'ROLE_ADMIN' ? null : (
                        <li>
                           <Link to="/admin" className=" text-sm active:bg-primaryblue/50 p-2 text-black">
                              <MdOutlineAdminPanelSettings size={18} />
                              Admin Panel
                           </Link>
                        </li>
                     )}

                     <li>
                        <button onClick={handleSignOut} className=" text-sm active:bg-primaryblue/50 p-2 text-black">
                           <BiLogOutCircle size={18} /> Sign out
                        </button>
                     </li>
                  </ul>
               </div>
            </div>
         </nav>
      </>
   );
};

export default memo(Navbar);
