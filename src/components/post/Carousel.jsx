import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import {BsTrash} from "react-icons/bs";
import {Keyboard, Pagination, Navigation} from "swiper";
const Carousel = ({imageUrls, setImages, files, setFiles, show}) => {
  return (
    <>
      {imageUrls !== undefined ? (
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
          {imageUrls.map((img, index) => (
            <SwiperSlide key={index}>
              {show ? (
                <div
                  onClick={() => {
                    setImages(imageUrls.filter((tmp) => tmp !== img));
                    const fileArray = Array.from(files).filter(
                      (file) => file !== files[index]
                    );
                    setFiles(fileArray);
                  }}
                  className=" cursor-pointer p-2 absolute top-0 right-0 bg-red rounded"
                >
                  <BsTrash />
                </div>
              ) : null}

              <img src={img} alt="anh" className="rounded" />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </>
  );
};

export default Carousel;
