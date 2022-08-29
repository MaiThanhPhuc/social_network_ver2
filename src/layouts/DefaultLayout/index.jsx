import Header from '~/layouts/components/Header/Header';
import SideBar from '~/layouts/components/SideBar';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
const DefaultLayout = ({ children }) => {
    return (
        <>
            <div>
                <Header />
                <div className={cx('container')}>
                    <SideBar />
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
        </>
    );
};

export default DefaultLayout;
