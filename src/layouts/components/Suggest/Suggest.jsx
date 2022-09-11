import styles from './Suggest.module.scss';
import classNames from 'classnames/bind';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
import './styles.css';
const cx = classNames.bind(styles);

const ListGroups = [
   {
      image: 'https://images.unsplash.com/photo-1662638181175-af1629d662c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80e',
      name: 'Hang Mu',
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

const Suggest = () => {
   return (
      <>
         <div className={cx('wrapper')}>
            <div className={cx('inner')}>
               <div className={cx('suggest-group')}>
                  <div className={cx('suggest-group-heading')}>Suggested groups</div>
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
               <div className={cx('suggest-message')}></div>
            </div>
         </div>
      </>
   );
};

export default Suggest;
