import Header from '~/layouts/components/Header/Header';
import SideBar from '~/layouts/components/SideBar/Sidebar';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import Suggest from '../components/Suggest';
const cx = classNames.bind(styles);
const DefaultLayout = ({ children }) => {
   return (
      <>
         <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
               <SideBar />
               <div className={cx('content')}>{children}</div>
               <Suggest />
            </div>
         </div>
      </>
   );
};

export default DefaultLayout;
