import React, { useEffect, useState } from "react";
import { getPopularMovies } from "../api/popular";
import { getTopRateMovies } from "../api/topRate";
import { getNowPlaying } from "../api/nowPlaying";
import { getUpcoming } from "../api/upcoming";
import MovieSwiper from "../components/movie/Swiper";
import styled from "styled-components";
import { FcFilm, FcIdea, FcCloseUpMode, FcPlanner } from "react-icons/fc";
import Intro from "../components/movie/Intro";

const MoviePage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin: 0 auto;
  max-width: 1200px;
`;

const MovieSection = styled.section``;

const MovieSectionTitle = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
`;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popularMovieList, setPopularMovieList] = useState([]);
  const [topRateMovieList, setTopRateMovieList] = useState([]);
  const [nowPlayingMovieList, setNowPlayingMovieList] = useState([]);
  const [upcomingMovieList, setUpcomingMovieList] = useState([]);

  // 인기
  const fetchPopular = async () => {
    try {
      const popularData = await getPopularMovies();
      setPopularMovieList(popularData);
    } catch (err) {
      setError(err.message);
      console.error("에러:", err);
    } finally {
      setLoading(false);
    }
  };

  // 현재 상영 중
  const fetchNowPlaying = async () => {
    try {
      const nowPlayingData = await getNowPlaying();
      setNowPlayingMovieList(nowPlayingData);
    } catch (err) {
      setError(err.message);
      console.error("에러:", err);
    } finally {
      setLoading(false);
    }
  };

  // 개봉 예정
  const fetchUpcoming = async () => {
    try {
      const upcomingData = await getUpcoming();
      setUpcomingMovieList(upcomingData);
    } catch (err) {
      setError(err.message);
      console.error("에러:", err);
    } finally {
      setLoading(false);
    }
  };

  // 높은 평점
  const fetchTopRate = async () => {
    try {
      const topRateData = await getTopRateMovies();
      setTopRateMovieList(topRateData);
    } catch (err) {
      setError(err.message);
      console.error("에러:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopular();
    fetchNowPlaying();
    fetchUpcoming();
    fetchTopRate();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
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

        {popularMovieList.length === 0 ? (
          <p>인기 영화가 없습니다.</p>
        ) : (
          <MovieSwiper movieList={popularMovieList} />
        )}
      </MovieSection>

      {/* 현재 상영 중인 영화 */}
      <MovieSection>
        <MovieSectionTitle>
          현재 상영 중인 영화 <FcCloseUpMode />
        </MovieSectionTitle>

        {nowPlayingMovieList.length === 0 ? (
          <p>현재 상영 중인 영화가 없습니다.</p>
        ) : (
          <MovieSwiper movieList={nowPlayingMovieList} />
        )}
      </MovieSection>

      {/* 개봉 예정 영화 */}
      <MovieSection>
        <MovieSectionTitle>
          개봉 예정 영화 <FcPlanner />
        </MovieSectionTitle>

        {upcomingMovieList.length === 0 ? (
          <p>개봉 예정 영화가 없습니다.</p>
        ) : (
          <MovieSwiper movieList={upcomingMovieList} />
        )}
      </MovieSection>

      {/* 평점 높은 영화 */}
      <MovieSection>
        <MovieSectionTitle>
          평점 높은 영화 <FcIdea />
        </MovieSectionTitle>

        {topRateMovieList.length === 0 ? (
          <p>평점 높은 영화가 없습니다.</p>
        ) : (
          <MovieSwiper movieList={topRateMovieList} />
        )}
      </MovieSection>
    </MoviePage>
  );
};

export default Home;