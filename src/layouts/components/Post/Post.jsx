import styles from './Post.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const Post = () => {
   return (
      <>
         <div className={cx('wrapper')}>
            <div className={cx('inner')}>Post</div>
         </div>
      </>
   );
};

export default Post;
