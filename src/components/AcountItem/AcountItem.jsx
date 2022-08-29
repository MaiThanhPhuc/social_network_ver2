import classNames from 'classnames/bind';
import styles from './AcountItem.module.scss';
import Avatar from '~/components/Avatar';
const cx = classNames.bind(styles);
const AcountItem = ({ dataSearch, dataNotification }) => {
    return (
        <>
            {dataSearch ? (
                <div className={cx('wrapper')}>
                    <div className={cx('inner')}>
                        <Avatar medium />
                        <div className={cx('infomation')}>
                            <div className={cx('name')}>Nguyễn</div>
                            <div className={cx('email')}>email@gmail.com</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('wrapper')}>
                    <div className={cx('inner')}>
                        <Avatar medium />
                        <div className={cx('infomation')}>
                            <div className={cx('name')}>
                                Nguyễn
                                <span className={cx('action')}> aaaaaaaaaa</span>
                            </div>
                            <div className={cx('time')}>time</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AcountItem;
