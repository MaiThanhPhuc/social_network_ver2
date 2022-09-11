import Header from '~/layouts/components/Header/Header';
import styles from './MessageLayout.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
const MessageLayout = ({ children }) => {
   return (
      <>
         <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
               <div className={cx('content')}>{children}</div>
            </div>
         </div>
      </>
   );
};

export default MessageLayout;
