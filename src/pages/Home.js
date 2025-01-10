import React, { useEffect, useState } from "react";
import { getPopularMovies } from "../api/popular";
import { getTopRateMovies } from "../api/topRate";
import { getNowPlaying } from "../api/nowPlaying";
import { getUpcoming } from "../api/upcoming";
import MovieSwiper from "../components/movie/Swiper";
import styled from "styled-components";
import { FcFilm, FcIdea, FcCloseUpMode, FcPlanner } from "react-icons/fc";
import Intro from "../components/movie/Intro";
import { useQuery } from "@tanstack/react-query";

const MoviePage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin: 0 auto;
  padding: 0 30px;
  max-width: 1260px;

  @media (max-width: 1024px) {
    gap: 2rem;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
    gap: 1rem;
  }
`;

const MovieSection = styled.section``;

const MovieSectionTitle = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Home = () => {
  // 인기 영화
  const { data: popularData = [], isLoading: popularLoading, isError: popularError, error: popularErrorMessage } = useQuery({
    queryKey: ['popularData'],
    queryFn: () => getPopularMovies(1),
  });

  // 현재 상영 중
  const { data: nowPlayingData = [], isLoading: nowPlayingLoading, isError: nowPlayingError, error: nowPlayingErrorMessage } = useQuery({
    queryKey: ['nowPlayingData'],
    queryFn: () => getNowPlaying(1),
  });

  // 개봉 예정
  const { data: upcomingData = [], isLoading: upcomingLoading, isError: upcomingError, error: upcomingErrorMessage } = useQuery({
    queryKey: ['upcomingData'],
    queryFn: () => getUpcoming(1),
  });

  // 높은 평점
  const { data: topRateData = [], isLoading: topRateLoading, isError: topRateError, error: topRateErrorMessage } = useQuery({
    queryKey: ['topRateData'],
    queryFn: () => getTopRateMovies(1),
  });

  // 로딩 상태 처리
  if (popularLoading || nowPlayingLoading || upcomingLoading || topRateLoading) {
    return <p>Loading...</p>;
  }

  // 에러 상태 처리
  if (popularError || nowPlayingError || upcomingError || topRateError) {
    return (
      <div>
        {popularError && <p>인기 영화: {popularErrorMessage.message}</p>}
        {nowPlayingError && <p>현재 상영 중: {nowPlayingErrorMessage.message}</p>}
        {upcomingError && <p>개봉 예정: {upcomingErrorMessage.message}</p>}
        {topRateError && <p>평점 높은 영화: {topRateErrorMessage.message}</p>}
      </div>
    );
  }

  return (
    <MoviePage>
      {/* 홈페이지 소개 */}
      <MovieSection>
        <Intro />
      </MovieSection>

      {/* 인기 영화 */}
      <MovieSection>
        <MovieSectionTitle>
          인기 영화 <FcFilm />
        </MovieSectionTitle>

        {popularData.length === 0 ? (
          <p>인기 영화가 없습니다.</p>
        ) : (
          <MovieSwiper movieList={popularData} />
        )}
      </MovieSection>

      {/* 현재 상영 중인 영화 */}
      <MovieSection>
        <MovieSectionTitle>
          현재 상영 중인 영화 <FcCloseUpMode />
        </MovieSectionTitle>

        {nowPlayingData.length === 0 ? (
          <p>현재 상영 중인 영화가 없습니다.</p>
        ) : (
          <MovieSwiper movieList={nowPlayingData} />
        )}
      </MovieSection>

      {/* 개봉 예정 영화 */}
      <MovieSection>
        <MovieSectionTitle>
          개봉 예정 영화 <FcPlanner />
        </MovieSectionTitle>

        {upcomingData.length === 0 ? (
          <p>개봉 예정 영화가 없습니다.</p>
        ) : (
          <MovieSwiper movieList={upcomingData} />
        )}
      </MovieSection>

      {/* 평점 높은 영화 */}
      <MovieSection>
        <MovieSectionTitle>
          평점 높은 영화 <FcIdea />
        </MovieSectionTitle>

        {topRateData.length === 0 ? (
          <p>평점 높은 영화가 없습니다.</p>
        ) : (
          <MovieSwiper movieList={topRateData} />
        )}
      </MovieSection>
    </MoviePage>
  );
};

export default Home;
