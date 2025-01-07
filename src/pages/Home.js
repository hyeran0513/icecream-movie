import React, { useEffect, useState } from 'react'
import { getPopularMovies } from "../api/popular";
import MovieSwiper from '../components/movie/Swiper';
import styled from "styled-components";

const MoviePage = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`;

const MovieSection = styled.section``;

const MovieSectionTitle = styled.p`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
`;

const Home = () => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const popularData = await getPopularMovies();
        console.log(popularData);
        setMovieList(popularData);
      } catch (err) {
        setError(err.message);
        console.error("에러:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
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
        <MovieSectionTitle>인기 영화 🎬</MovieSectionTitle>

        {movieList.length === 0 ? (
          <p>영화가 없습니다.</p>
        ) : (
          <MovieSwiper movieList={movieList} />
        )}
      </MovieSection>
    </MoviePage>
  )
}

export default Home