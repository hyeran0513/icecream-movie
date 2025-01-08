import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import styled from "styled-components";
import Card from "./Card";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const SwiperWrapper = styled.div`
  position: relative;
`;

const StyledSwiper = styled(Swiper)``;

const NavigationButton = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;
  z-index: 10;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.6);

  &:hover {
    background-color: #000;
    border-color: #fff;
  }

  svg {
    font-size: 24px;
  }

  &.prev {
    left: -20px;
  }

  &.next {
    right: -20px;
  }
`;

const MovieSwiper = ({ movieList }) => {
  const prevRef = useRef();
  const nextRef = useRef();

  return (
    <SwiperWrapper>
      <StyledSwiper
        spaceBetween={20}
        slidesPerView={5}
        modules={[Navigation]}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        {movieList.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Card movie={movie} />
          </SwiperSlide>
        ))}
      </StyledSwiper>

      <NavigationButton ref={prevRef} className="prev">
        <BiChevronLeft />
      </NavigationButton>
      
      <NavigationButton ref={nextRef} className="next">
        <BiChevronRight />
      </NavigationButton>
    </SwiperWrapper>
  );
};

export default MovieSwiper;