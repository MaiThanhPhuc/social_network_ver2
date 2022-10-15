import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import {Keyboard, Pagination, Navigation} from "swiper";
const CarouselPost = ({images}) => {
  return (
    <>
      {images !== undefined ? (
        <div className=" w-[480px] h-imagePostHeight">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            keyboard={{
              enabled: true,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Keyboard, Pagination, Navigation]}
            className="mySwiper rounded"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img.urlImage} alt="anh" className="rounded" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : null}
    </>
  );
};

export default CarouselPost;
