import styles from './Galary.module.scss';
import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import '~/components/GlobalStyles/SwiperStyles.css';

import { Pagination, Navigation } from 'swiper';
const cx = classNames.bind(styles);
const listImage = [
   {
      imgUrl:
         'https://images.unsplash.com/photo-1663536101998-36c21a2946dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80',
   },
   {
      imgUrl:
         'https://images.unsplash.com/photo-1663676609844-07dd7294b3cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
   },

   {
      imgUrl:
         'https://images.unsplash.com/photo-1663524023198-1e808ad5e686?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80',
   },
   {
      vidUrl: 'https://media.istockphoto.com/videos/keyboard-typing-video-id499062353',
   },
];
const Galary = () => {
   return (
      <>
         <div className={cx('wrapper')}>
            <div className={cx('inner')}>
               <Swiper
                  spaceBetween={30}
                  pagination={true}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className={cx('mySwiper galary-list')}
               >
                  {listImage.map((item, index) => (
                     <SwiperSlide key={index} className={cx('galary-item')}>
                        {item?.imgUrl ? (
                           <img src={item?.imgUrl} alt=" imagePost" />
                        ) : (
                           <iframe title="test" height="500" width="500" src={item?.vidUrl} frameBorder="0"></iframe>
                        )}
                     </SwiperSlide>
                  ))}
               </Swiper>
            </div>
         </div>
      </>
   );
};

export default Galary;
