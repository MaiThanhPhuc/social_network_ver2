import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import Avatar from '~/components/Avatar';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

const ListActionButton = [
   {
      icon: 'ri:messenger-line',
      name: 'Message',
      link: '/message',
      color: '#0079d3',
   },
   {
      icon: 'fluent:news-28-regular',
      name: 'News Feed',
      link: '/',
      color: '#ff4154',
   },
   {
      icon: 'fluent:video-clip-multiple-20-regular',
      name: 'Watchs',
      link: '/watchs',
      color: '#ffbf00',
   },
];

const ListShortCut = [
   {
      name: 'UI/UX Designer',
      link: '/message',
   },
   {
      name: 'UTE K19',
      link: '/',
   },
   {
      name: 'Bộ tộc Mixigaming',
      link: '/watchs',
   },
];

const ListExplore = [
   {
      icon: 'akar-icons:people-group',
      name: 'Groups',
      link: '/group',
   },
   {
      icon: 'carbon:event',
      name: 'Events',
      link: '/event',
   },
   {
      icon: 'ant-design:flag-outlined',
      name: 'Pages',
      link: '/page',
   },
];

const SideBar = () => {
   return (
      <>
         <div className={cx('wrapper')}>
            <div className={cx('inner')}>
               <div className={cx('action-buttons')}>
                  <div className={cx('action-buttons-heading')}>Action Buttons</div>
                  <div className={cx('action-buttons-account')}>
                     <Avatar small />
                     <span className={cx('action-buttons-account__name')}>Nguyễn Dư</span>
                  </div>
                  <ul className={cx('action-buttons-list')}>
                     {ListActionButton.map((item, index) => (
                        <li key={index} className={cx('action-buttons-list-item')}>
                           <Link to={item.link}>
                              <span
                                 style={{ backgroundColor: `${item.color}` }}
                                 className={cx('action-buttons-list-item-icon')}
                              >
                                 <Icon fontSize={18} icon={item.icon} />
                              </span>
                              <span>{item.name}</span>
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>
               <div className={cx('shortcuts')}>
                  <div className={cx('shortcuts-heading')}>Shortcuts</div>
                  <ul className={cx('shortcuts-list')}>
                     {ListShortCut.map((item, index) => (
                        <li key={index} className={cx('shortcuts-list-item')}>
                           <Link to={item.link}>
                              <span className={cx('shortcuts-list-item-icon')}>
                                 <Icon fontSize={16} icon="akar-icons:people-group" />
                              </span>
                              <span>{item.name}</span>
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>
               <div className={cx('explore')}>
                  <div className={cx('shortcuts-heading')}>Explore</div>
                  <ul className={cx('explore-list-list')}>
                     {ListExplore.map((item, index) => (
                        <li key={index} className={cx('explore-list-item')}>
                           <Link to={item.link}>
                              <span className={cx('explore-list-item-icon')}>
                                 <Icon fontSize={16} icon={item.icon} />
                              </span>
                              <span>{item.name}</span>
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
      </>
   );
};

export default SideBar;
