import styles from './Post.module.scss';
import classNames from 'classnames/bind';
import Avatar from '~/components/Avatar';
import { format } from 'timeago.js';
import Tippy from '@tippyjs/react';
import Popper from '~/components/Popper';
import Button from '~/components/Button';
import { Icon } from '@iconify/react';
const cx = classNames.bind(styles);

const Post = ({ data }) => {
   const menuPost = [
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
      },
   ];

   return (
      <>
         <div className={cx('wrapper')}>
            <div className={cx('inner')}>
               <div className={cx('post-heading')}>
                  <div className={cx('post-heading-left')}>
                     <Avatar small />
                     <div className={cx('post-heading-left-des')}>
                        <span className={cx('post-heading-left-des__name')}>{data?.name} test </span>
                        <span className={cx('post-heading-left-des__time')}>{format(data?.time)} bay h</span>
                     </div>
                  </div>
                  <div className={cx('post-heading-right')}>
                     <Tippy
                        placement={'bottom-start'}
                        visible={true}
                        interactive
                        render={(attrs) => (
                           <div className={cx('post-heading-right-dropdown')} tabIndex="-1" {...attrs}>
                              <Popper>
                                 {menuPost.map((item, index) => (
                                    <Button
                                       to={item.to}
                                       className={cx('menuPost-item')}
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
                        <div className={cx('post-heading-right-button')}>
                           <Icon icon="bi:three-dots" />
                        </div>
                     </Tippy>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Post;
