import styles from './Button.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

const Button = ({
    to,
    href,
    primary = false,
    text = false,
    small = false,
    medium = false,
    large = false,
    outline = false,
    disabled = false,
    leftIcon,
    rightIcon,
    link,
    children,
    onClick,
    className,
    ...passProps
}) => {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        link,
        medium,
        small,
        text,
        large,
        outline,
        disabled,
    });

    return (
        <>
            <Comp className={classes} {...props}>
                {leftIcon && <span className={cx('leftIcon')}>{leftIcon}</span>}
                {children}
                {rightIcon && <span className={cx('rightIcon')}>{rightIcon}</span>}
            </Comp>
        </>
    );
};

export default Button;
