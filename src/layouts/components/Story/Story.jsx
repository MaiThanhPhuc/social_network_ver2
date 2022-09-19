import styles from './Story.module.scss';

import classNames from 'classnames/bind';
import Avatar from '~/components/Avatar';
const cx = classNames.bind(styles);

const Story = ({ data, children, ...passProps }) => {
   return (
      <>
         <div className={cx('wrapper')}>
            <div className={cx('inner')}>
               <div className={cx('story-background')}>
                  <img src={data?.image} alt="story" />
               </div>
               {data?.avatar ? (
                  <div className={cx('story-avatar')}>
                     <div className={cx(`story-avatar-status`)}>
                        <Avatar src={data?.avatar} medium />
                     </div>
                  </div>
               ) : null}
               <div className={cx('story-name')} {...passProps}>
                  <span className={cx('story-name-block')}>{data?.name}</span>
               </div>
               {children}
            </div>
         </div>
      </>
   );
};

export default Story;
