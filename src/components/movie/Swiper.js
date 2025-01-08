import React, { useRef, useState, useEffect } from "react";
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
  background-color: var(--swiper-bg-color);
  color: var(--swiper-icon-color);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;
  z-index: 10;
  transition: background-color 0.3s ease;
  opacity: ${(props) => (props.disabled ? 0 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  visibility: ${(props) => (props.disabled ? "hidden" : "visible")};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06), 0 4px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: var(--swiper-hover-bg-color);
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
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (prevRef.current) {
      prevRef.current.disabled = isBeginning;
    }
    
    if (nextRef.current) {
      nextRef.current.disabled = isEnd;
    }
  }, [isBeginning, isEnd]);

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
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      >
        {movieList.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Card movie={movie} />
          </SwiperSlide>
        ))}
      </StyledSwiper>

      <NavigationButton ref={prevRef} className="prev" disabled={isBeginning}>
        <BiChevronLeft />
      </NavigationButton>
      
      <NavigationButton ref={nextRef} className="next" disabled={isEnd}>
        <BiChevronRight />
      </NavigationButton>
    </SwiperWrapper>
  );
};

export default MovieSwiper;
