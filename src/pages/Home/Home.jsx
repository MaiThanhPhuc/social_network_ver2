import Post from '~/layouts/components/Post';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Avatar from '~/components/Avatar';
import Button from '~/components/Button';
import Story from '~/layouts/components/Story';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);
const listStory = [
   {
      image: 'https://images.unsplash.com/photo-1662638181175-af1629d662c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80e',
      avatar:
         'https://images.unsplash.com/photo-1662835291968-0a61659ff3cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      name: 'Nguyễn A',
      status: true,
   },
   {
      image: 'https://images.unsplash.com/photo-1662835291968-0a61659ff3cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      avatar:
         'https://images.unsplash.com/photo-1662835291968-0a61659ff3cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      name: 'Alexander',
      status: false,
   },
   {
      image: 'https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      avatar:
         'https://images.unsplash.com/photo-1662835291968-0a61659ff3cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      name: 'Chill and Free',
      status: true,
   },
   {
      image: 'https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      avatar:
         'https://images.unsplash.com/photo-1662835291968-0a61659ff3cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      name: 'Chill and Free',
      status: true,
   },
   {
      image: 'https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      avatar:
         'https://images.unsplash.com/photo-1662835291968-0a61659ff3cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      name: 'Chill and Free',
      status: true,
   },
];

const Home = () => {
   const user = useSelector((state) => state.user.user.user?.data);
   const userStory = {
      image: user?.imageUrl,
      name: 'Add Story',
      status: true,
   };
   return (
      <>
         <div className={cx('wrapper')}>
            <div className={cx('inner')}>
               <div className={cx('home-form-stories')}>
                  <div className={cx('home-form-stories-newStory')}>
                     <Link to="/">
                        <Story data={userStory}>
                           <button className={cx('home-form-stories-newStory__button')}>
                              <Icon icon="akar-icons:plus" />
                           </button>
                        </Story>
                     </Link>
                  </div>
                  <div className={cx('home-form-stories-listStory')}>
                     <Swiper
                        slidesPerView={3}
                        spaceBetween={8}
                        slidesPerGroup={3}
                        loopFillGroupWithBlank={true}
                        navigation={true}
                        modules={[Navigation]}
                        className="mySwiper"
                     >
                        {listStory.map((item, index) => (
                           <SwiperSlide key={index}>
                              <Link to="/">
                                 <Story data={item} />
                              </Link>
                           </SwiperSlide>
                        ))}
                     </Swiper>
                  </div>
               </div>
               <div className={cx('home-form-createPost')}>
                  <div className={cx('home-form-createPost-heading')}>
                     <div className={cx('home-form-createPost-heading__avatar')}>
                        <Avatar small />
                     </div>
                     <div className={cx('home-form-createPost-heading__input')}>
                        <input type="text" placeholder={"What's new, Alex ?"} />
                     </div>
                     <div className={cx('home-form-createPost-heading__button')}>
                        <Button primary>Post It!</Button>
                     </div>
                  </div>
               </div>
               <div className={cx('home-form-posts')}></div>
            </div>
         </div>
         <Post />
      </>
   );
};

export default Home;
