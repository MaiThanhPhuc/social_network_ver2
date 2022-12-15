import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import Notification from './Notification';
import Account from './Account';
import SkeletonSeach from './SkeletonSeach';
import useDebounce from '../../hooks/useDebounce';
import SuggestResult from './SuggestResult';
const API_URL = process.env.REACT_APP_BASE_URL;

const Navbar = () => {
   const [noti, setNoti] = useState(true);
   const [notiData, setNotiData] = useState([]);
   const [page, setPage] = useState(0);
   const [hasMore, setHasMore] = useState(true);
   const [showSuggest, setShowSuggest] = useState(false);
   const [countNoti, setCountNoti] = useState([]);
   const [searchValue, setSearchValue] = useState('');
   const [searchResult, setSearchResult] = useState([]);
   const user = JSON.parse(localStorage.getItem('user'));
   const avatar = localStorage.getItem('userImgUrl');
   const Id = user.userId;
   const debouncedValue = useDebounce(searchValue, 200);
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

   const fetchSearchUsers = () => {
      setShowSuggest(true);
      userService
         .searchUser(searchValue)
         .then((res) => {
            setSearchResult(res);
            setShowSuggest(false);
         })
         .catch((err) => {
            setShowSuggest(false);
            console.log(err);
         });
   };

   useEffect(() => {
      if (debouncedValue.trim() !== '' && !debouncedValue.includes('#')) {
         fetchSearchUsers();
      }
   }, [debouncedValue]);

   const handleSearch = async (e) => {
      e.preventDefault();
      if (debouncedValue.trim() !== '') {
         let key = await debouncedValue.substring(1);
         navigate({
            pathname: '/search',
            search: `?key=${key}`,
         });
      }
   };

   return (
      <>
         <nav className="flex items-center py-1 px-16 justify-evenly bg-white fixed w-full top-0 z-20 border-b border-black/20 ">
            <Link to="/" className="wrapper-right flex items-center cursor-pointer">
               <img src={logo} alt="Logo" className="w-[200px]" />
            </Link>
            <form
               onSubmit={handleSearch}
               className="relative bg-grayLight wrapper-middle outline outline-[#000]/20 outline-1 h-8 w-[300px] flex hover:outline-primaryblue focus-within:outline-primaryblue rounded "
            >
               <div onClick={handleSearch} className="pl-4 pr-3 flex justify-center items-center cursor-pointer ">
                  <BiSearch color="#878A8C" size={25} />
               </div>
               <input
                  onChange={(e) => {
                     setSearchValue(e.target.value);
                  }}
                  className="px-2 w-full outline-none text-[14px] bg-grayLight text-bodytxt focus:bg-white "
                  type="text"
                  placeholder="Search..."
                  maxLength={50}
               ></input>
               {searchResult ? <SuggestResult searchResult={searchResult} showResult={showSuggest} /> : null}
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
                           <img src={avatar} alt="avatar" />
                        </div>
                     </button>
                  </label>
                  <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-white rounded-box w-40 text-base">
                     <li>
                        <Link to={`/user/${Id}`} className=" text-sm active:bg-primaryblue/50 p-2 text-black">
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

export default Navbar;
