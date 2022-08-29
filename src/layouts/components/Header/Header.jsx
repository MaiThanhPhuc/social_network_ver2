import { useState } from 'react';
import styles from './Header.module.scss';
import Tippy from '@tippyjs/react/headless';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import { Icon } from '@iconify/react';
import icons from '~/assets/icons';
import AcountItem from '~/components/AcountItem';
import Avatar from '~/components/Avatar';
import Popper from '~/components/Popper';
import Search from '../Search';
const cx = classNames.bind(styles);
const menuAvatar = [
    {
        icon: 'iconoir:profile-circled',
        name: 'Profile',
        to: '/profile',
    },
    {
        icon: 'ant-design:setting-outlined',
        name: 'Settings',
        to: '/setting',
    },
    {
        icon: 'material-symbols:exit-to-app-rounded',
        name: 'Log Out',
    },
];
const Header = () => {
    // const [searchData, setSearchData] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    // const [loading, setLoading] = useState(false);
    const handleShowNotification = () => {
        setShowNotification(true);
    };
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('logo')}>
                        <img src={icons.logo} alt="logo" />
                    </div>
                    <Search />
                    <div className={cx('actions')}>
                        <div className={cx('actions-button')}>
                            <Button primary leftIcon={<Icon icon="fa:plus-square-o" />}>
                                Create
                            </Button>
                        </div>
                        <Tippy
                            placement={'bottom-end'}
                            visible={showNotification}
                            interactive
                            arrow={true}
                            onClickOutside={() => setShowNotification(false)}
                            render={(attrs) => (
                                <div className={cx('actions-notification-dropdown')} tabIndex="-1" {...attrs}>
                                    <Popper>
                                        <AcountItem />
                                        <AcountItem />
                                    </Popper>
                                </div>
                            )}
                        >
                            <div onClick={handleShowNotification} className={cx('actions-notification')}>
                                <span className={cx('actions-notification-icon')}>
                                    <span className={cx('actions-notification-icon-alert')}></span>
                                    <Icon icon="ion:notifications-outline" />
                                </span>
                            </div>
                        </Tippy>

                        <div className={cx('actions-inbox')}>
                            <Button to={'/message'} className={cx('actions-inbox-icon')}>
                                <span className={cx('actions-inbox-icon-alert')}></span>
                                <Icon icon="ion:chatbubble-outline" />
                            </Button>
                        </div>

                        <Tippy
                            placement={'bottom-end'}
                            visible={showMenu}
                            interactive
                            onClickOutside={() => setShowMenu(false)}
                            render={(attrs) => (
                                <div className={cx('actions-avatar-dropdown')} tabIndex="-1" {...attrs}>
                                    <Popper>
                                        {menuAvatar.map((item, index) => (
                                            <Button
                                                to={item.to}
                                                className={cx('menu-item')}
                                                key={index}
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
                            <div onClick={() => setShowMenu(true)} className={cx('actions-avatar')}>
                                <Avatar small />
                            </div>
                        </Tippy>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
