import React, { useState, useEffect } from "react";
import { getNowPlaying } from "../api/nowPlaying";
import styled from "styled-components";
import Card from "../components/movie/Card";
import Banner from "../components/movie/Banner";

const MoviePage = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`;

const MovieList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
`;

const ButtonWrapper = styled.div`
  margin-top: 30px;
`;

const ButtonMore = styled.button`
  position: relative;
  padding: 14px;
  width: 100%;
  background-color: var(--primary-color);
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--primary-darken-color);
  }
`;

const NowPlaying = () => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchNowPlaying = async () => {
    try {
      const nowPlayingData = await getNowPlaying(page);

      if (page === 1) {
        // 첫 페이지일 경우 이전 결과를 덮어씀
        setMovieList(nowPlayingData);
      } else {
        // 그 외 페이지일 경우 기존 목록에 추가
        setMovieList((prevMovies) => [...prevMovies, ...nowPlayingData]);
      }
    } catch (err) {
      setError(err.message);
      console.error("에러:", err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchNowPlaying(page);
  }, [page]);

  // 더 보기 핸들러
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (loading && page === 1) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Banner title={"현재 상영 중인 영화"} type="nowPlaying" />

      <MoviePage>
        <MovieList>
          {movieList.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </MovieList>

        {movieList.length >= 20 && (
          <ButtonWrapper>
            <ButtonMore type="button" onClick={handleLoadMore}>
              더 보기
            </ButtonMore>
          </ButtonWrapper>
        )}
      </MoviePage>
    </>
  );
};

export default NowPlaying;