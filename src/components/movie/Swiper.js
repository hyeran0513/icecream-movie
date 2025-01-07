import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import Card from './Card';

const MovieSwiper = ({ movieList }) => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={5}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Navigation]}
    >
      {movieList.map((movie) => (
        <SwiperSlide key={movie.id}>
          <Card movie={movie} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MovieSwiper;
