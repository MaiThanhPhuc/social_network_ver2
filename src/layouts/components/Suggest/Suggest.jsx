import styles from './Suggest.module.scss';
import classNames from 'classnames/bind';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
import '~/components/GlobalStyles/SwiperStyles.css';
import Avatar from '~/components/Avatar';
const cx = classNames.bind(styles);

const ListGroups = [
   {
      image: 'https://images.unsplash.com/photo-1662638181175-af1629d662c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80e',
      name: 'Hang Đá',
      link: '/',
   },
   {
      image: 'https://images.unsplash.com/photo-1662835291968-0a61659ff3cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      name: 'Dalat ',
      link: '/',
   },
   {
      image: 'https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      name: 'Chill and Free',
      link: '/',
   },
];

const ListContacts = [
   {
      image: 'https://images.unsplash.com/photo-1662638181175-af1629d662c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80e',
      name: 'Hang Đá',
      status: 'online',
   },
   {
      image: 'https://images.unsplash.com/photo-1662835291968-0a61659ff3cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      name: 'Dalat ',
      status: '22 minutes ago',
   },
   {
      image: 'https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      name: 'Chill and Free',
      status: '22 hours ago',
   },
];

const Suggest = () => {
   return (
      <>
         <div className={cx('wrapper')}>
            <div className={cx('inner')}>
               <div className={cx('suggest-group')}>
                  <div className={cx('suggest-group-heading')}>Suggested groups</div>
                  <div className={cx('suggest-group-body')}>
                     <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                        {ListGroups.map((item, index) => (
                           <SwiperSlide key={index}>
                              <Link to={item.link}>
                                 <div className={cx('suggest-group-item')}>
                                    <div className={cx('suggest-group-item-image')}>
                                       <img src={item.image} alt="anh" />
                                       <button className={cx('suggest-group-item-image__remove')}>
                                          <Icon icon="bi:x-lg" />
                                       </button>
                                    </div>
                                    <div className={cx('suggest-group-item-body')}>
                                       <div className={cx('suggest-group-item-body__name')}>{item.name}</div>
                                       <div className={cx('suggest-group-item-body__des')}>
                                          25K members ◦ 10+ post a day
                                       </div>
                                       <Button className={cx('suggest-group-item-body__button')} primary>
                                          Join group
                                       </Button>
                                    </div>
                                 </div>
                              </Link>
                           </SwiperSlide>
                        ))}
                     </Swiper>
                  </div>
               </div>
               <div className={cx('suggest-message')}>
                  <div className={cx('suggest-message-heading')}>
                     <div className={cx('suggest-message-heading__tile')}>
                        <span>Contacts</span>
                     </div>
                     <div className={cx('suggest-message-heading__count')}>
                        <span>12</span>
                     </div>
                  </div>
                  <div className={cx('suggest-message-list')}>
                     {ListContacts.map((item, index) => (
                        <div key={index} className={cx('suggest-message-list-item')}>
                           <Avatar src={item.image} small />
                           <div className={cx('suggest-message-list-item-info')}>
                              <div className={cx('suggest-message-list-item__name')}>{item.name}</div>
                              <div className={cx('suggest-message-list-item__status')}>
                                 {item.status === 'online' ? (
                                    <span className={cx('suggest-message-list-item__status__online')}>
                                       <Icon color="#31a24c" icon="carbon:dot-mark" />
                                       <span className={cx('suggest-message-list-item__status__online__status')}>
                                          {item.status}
                                       </span>
                                    </span>
                                 ) : (
                                    <span className={cx('suggest-message-list-item__status__offline')}>
                                       <Icon color="#888888" icon="ant-design:clock-circle-outlined" />
                                       <span className={cx('suggest-message-list-item__status__offline__time')}>
                                          {item.status}
                                       </span>
                                    </span>
                                 )}
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Suggest;
