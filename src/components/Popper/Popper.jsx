import styles from './Popper.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
const Popper = ({ children }) => {
    return (
        <>
            <div className={cx('wrapper')}>{children}</div>
        </>
    );
};

export default Popper;
