import React, { useEffect, useState } from 'react'
import { getPopularMovies } from "../api/popular";
import { getTopRateMovies } from "../api/topRate"
import MovieSwiper from '../components/movie/Swiper';
import styled from "styled-components";
import { FcFilm, FcIdea } from "react-icons/fc";

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

  useEffect(() => {
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

    fetchPopular();
  }, []);

  useEffect(() => {
    const fetchTopRate = async () => {
      try {
        const popularData = await getTopRateMovies();
        setTopRateMovieList(popularData);
      } catch (err) {
        setError(err.message);
        console.error("에러:", err);
      } finally {
        setLoading(false);
      }
    };

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
      <MovieSection>
        <MovieSectionTitle>인기 영화 <FcFilm /></MovieSectionTitle>

        {popularMovieList.length === 0 ? (
          <p>인기 영화가 없습니다.</p>
        ) : (
          <MovieSwiper movieList={popularMovieList} />
        )}
      </MovieSection>

      <MovieSection>
        <MovieSectionTitle>평점 높은 영화 <FcIdea /></MovieSectionTitle>

        {topRateMovieList.length === 0 ? (
          <p>평점 높은 영화가 없습니다.</p>
        ) : (
          <MovieSwiper movieList={topRateMovieList} />
        )}
      </MovieSection>
    </MoviePage>
  )
}

export default Home