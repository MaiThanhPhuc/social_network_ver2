import { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import Tippy from '@tippyjs/react/headless';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import { Icon } from '@iconify/react';
import icons from '~/assets/icons';
import Avatar from '~/components/Avatar';
import Popper from '~/components/Popper';
import Search from '../Search';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '~/redux/apiRequets';
import { useNavigate } from 'react-router-dom';
import { logOut } from '~/redux/apiRequets';
import Notification from '../Notification';
const cx = classNames.bind(styles);

const Header = () => {
   const [showMenu, setShowMenu] = useState(false);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const auth = useSelector((state) => state.auth.login?.currentUser);
   const user = useSelector((state) => state.user.user.user?.data);
   useEffect(() => {
      if (!auth) {
         navigate('/login');
      }
      if (auth?.access_token) {
         getUser(auth?.access_token, dispatch, auth?.userId);
      }
   }, [auth, dispatch, navigate]);

   const handleLogout = () => {
      logOut(dispatch, navigate);
   };
   const menuAvatar = [
      {
         icon: 'iconoir:profile-circled',
         name: 'Profile',
         to: '/profile',
      },
      {
         icon: 'ant-design:setting-outlined',
         name: 'Settings',
         to: '/setting',
      },
      {
         icon: 'material-symbols:exit-to-app-rounded',
         name: 'Log Out',
         action: handleLogout,
      },
   ];
   return (
      <>
         <div className={cx('wrapper')}>
            <div className={cx('inner')}>
               <div className={cx('logo')}>
                  <img src={icons.logo} alt="logo" />
               </div>
               {/* Search Component */}
               <Search />
               {/* Search Component */}

               <div className={cx('actions')}>
                  <div className={cx('actions-button')}>
                     <Button primary leftIcon={<Icon icon="fa:plus-square-o" />}>
                        Create
                     </Button>
                  </div>
                  {/* Notification */}
                  <Notification />
                  {/* End Noti */}
                  <div className={cx('actions-inbox')}>
                     <Button to={'/message'} className={cx('actions-inbox-icon')}>
                        <span className={cx('actions-inbox-icon-alert')}></span>
                        <Icon icon="ion:chatbubble-outline" />
                     </Button>
                  </div>
                  {/* Avatar Menu */}

                  <Tippy
                     placement={'bottom-end'}
                     visible={showMenu}
                     interactive
                     onClickOutside={() => setShowMenu(false)}
                     render={(attrs) => (
                        <div className={cx('actions-avatar-dropdown')} tabIndex="-1" {...attrs}>
                           <Popper>
                              {menuAvatar.map((item, index) => (
                                 <Button
                                    to={item.to}
                                    className={cx('menu-item')}
                                    key={index}
                                    onClick={item.action}
                                    text
                                    leftIcon={<Icon icon={item.icon} />}
                                 >
                                    {item.name}
                                 </Button>
                              ))}
                           </Popper>
                        </div>
                     )}
                  >
                     <div onClick={() => setShowMenu(true)} className={cx('actions-avatar')}>
                        <Avatar src={user?.imageUrl} small />
                     </div>
                  </Tippy>
               </div>
            </div>
         </div>
      </>
   );
};

export default Header;
