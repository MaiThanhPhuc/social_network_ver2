import styles from './Story.module.scss';

import classNames from 'classnames/bind';
import Avatar from '~/components/Avatar';
const cx = classNames.bind(styles);

const Story = ({ data, children }) => {
   return (
      <>
         <div className={cx('wrapper')}>
            <div className={cx('inner')}>
               <img className={cx('story-background')} src={data?.image} alt="story" />
               <div className={cx('story-avatar')}>
                  <Avatar src={data?.image} small />
               </div>
               <div className={cx('story-name')}>
                  <span className={cx('story-name-block')}>{data?.name}</span>
               </div>
               {children}
            </div>
         </div>
      </>
   );
};

export default Story;
