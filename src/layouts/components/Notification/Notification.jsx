import { useState, useEffect } from 'react';
import AcountItem from '~/components/AcountItem';
import Popper from '~/components/Popper';
import styles from './Notification.module.scss';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import userServices from '~/services/userServices';
const cx = classNames.bind(styles);
const Notification = () => {
   const [showNotification, setShowNotification] = useState(false);
   const [notificationData, setNotificationData] = useState([]);
   const [hasMore, setHasMore] = useState(true);
   const [page, setPage] = useState(0);

   const auth = useSelector((state) => state.auth.login?.currentUser);

   const fetchDataNotification = () => {
      userServices
         .getNotification(auth?.userId, page, auth?.access_token)
         .then((res) => {
            setNotificationData([...notificationData, ...res]);
            setPage(page + 1);
            if (res.length < 5) {
               setHasMore(false);
            }
         })
         .catch((err) => console.log(err));
   };
   useEffect(() => {
      fetchDataNotification();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   return (
      <>
         <div>
            <Tippy
               placement={'bottom-end'}
               visible={showNotification}
               interactive
               onClickOutside={() => setShowNotification(false)}
               render={(attrs) => (
                  <div className={cx('actions-notification-dropdown')} tabIndex="-1" {...attrs}>
                     <Popper>
                        <InfiniteScroll
                           dataLength={notificationData.length} //This is important field to render the next data
                           next={fetchDataNotification}
                           hasMore={hasMore}
                           height={250}
                           loader={<h4>Loading...</h4>}
                           endMessage={
                              <p className={cx('notification-end')}>
                                 <b>No more Notification</b>
                              </p>
                           }
                        >
                           {notificationData.map((item, index) => (
                              <AcountItem dataNotification={item} key={index} />
                           ))}
                        </InfiniteScroll>
                     </Popper>
                  </div>
               )}
            >
               <div onClick={() => setShowNotification(true)} className={cx('actions-notification')}>
                  <span className={cx('actions-notification-icon')}>
                     <span className={cx('actions-notification-icon-alert')}></span>
                     <Icon icon="ion:notifications-outline" />
                  </span>
               </div>
            </Tippy>
         </div>
      </>
   );
};

export default Notification;
