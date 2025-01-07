import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';
import Card from './Card';

const MovieSwiper = ({ movieList }) => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={4}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
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
