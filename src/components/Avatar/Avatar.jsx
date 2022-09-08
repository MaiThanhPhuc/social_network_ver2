import defaultAvatar from '~/assets/images';
import classNames from 'classnames/bind';
import styles from './Avatar.module.scss';
const cx = classNames.bind(styles);

const Avatar = ({ src, medium, small, large }) => {
   const classes = cx('wrapper', {
      small,
      medium,
      large,
   });

   return (
      <>
         <div className={classes}>
            <img src={src ? src : defaultAvatar.avatarDefault} alt="avatar" />
         </div>
      </>
   );
};

export default Avatar;
