import classNames from 'classnames/bind';
import styles from './LoginLayout.module.scss';
const cx = classNames.bind(styles);
const LoginLayout = ({ children }) => {
   return (
      <>
         <div>
            <div className="container">
               <div className={cx('inner')}>
                  <div className={cx('image-wrapper')}></div>
                  <div className={cx('content')}>{children}</div>
               </div>
            </div>
         </div>
      </>
   );
};

export default LoginLayout;
