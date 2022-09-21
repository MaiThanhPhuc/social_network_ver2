import { useState } from 'react';
import styles from './Post.module.scss';
import classNames from 'classnames/bind';
import Avatar from '~/components/Avatar';
import { format } from 'timeago.js';
import Tippy from '@tippyjs/react/headless';
import Popper from '~/components/Popper';
import Button from '~/components/Button';
import { Icon } from '@iconify/react';
import Galary from '../Galary';
const cx = classNames.bind(styles);

const Post = ({ data }) => {
   const [showMenu, setShowMenu] = useState(false);

   const menuPost = [
      {
         icon: 'bxs:hide',
         name: 'Hide post',
      },
      {
         icon: 'octicon:report-16',
         name: 'Report Post',
      },
      {
         icon: 'ri:user-unfollow-line',
         name: 'Unfollow',
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
                        placement={'bottom'}
                        visible={showMenu}
                        interactive
                        onClickOutside={() => setShowMenu(false)}
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
                        <div onClick={() => setShowMenu(true)} className={cx('post-heading-right-button')}>
                           <Icon icon="bi:three-dots" />
                        </div>
                     </Tippy>
                  </div>
               </div>

               <div className={cx('post-body')}>
                  <div className={cx('post-body-content')}>
                     <p className={cx('post-body-content__text')}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, ipsam inventore natus vero
                        officia iste cumque minus aliquid sit commodi odit. Amet sapiente deleniti eveniet aliquid cum
                        reprehenderit alias eligendi?
                     </p>
                  </div>
                  <div className={cx('post-body-galary')}>
                     <Galary></Galary>
                  </div>
                  <div className={cx('post-body-actions')}></div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Post;
