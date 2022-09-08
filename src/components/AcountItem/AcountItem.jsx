import classNames from 'classnames/bind';
import styles from './AcountItem.module.scss';
import Avatar from '~/components/Avatar';
import { format } from 'timeago.js';

const cx = classNames.bind(styles);
const AcountItem = ({ data, dataNotification }) => {
   return (
      <>
         {data ? (
            <div className={cx('wrapper')}>
               <div className={cx('inner')}>
                  <Avatar src={data.imageUrl} medium />
                  <div className={cx('infomation')}>
                     <div className={cx('name')}>{data.lastName + ' ' + data.firstName}</div>
                     <div className={cx('email')}>{data.email}</div>
                  </div>
               </div>
            </div>
         ) : (
            <div className={cx('wrapper')}>
               <div className={cx('inner')}>
                  <Avatar src={dataNotification?.userCreate.imageUrl} medium />
                  <div className={cx('infomation')}>
                     <div className={cx('name')}>
                        {dataNotification?.userCreate.lastName + ' ' + dataNotification?.userCreate.firstName}
                        <span className={cx('action')}> {dataNotification?.content}</span>
                     </div>
                     <div className={cx('time')}>{format(dataNotification?.createTime)}</div>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default AcountItem;
