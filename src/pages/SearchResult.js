import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getSearch } from "../api/search";
import Card from "../components/movie/Card";

const MoviePage = styled.div`
  margin: 0 auto;
  padding: 0 30px;
  max-width: 1260px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const MovieList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) {
    gap: 1rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 30px;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const ButtonMore = styled.button`
  position: relative;
  padding: 14px;
  width: 100%;
  background-color: var(--primary-color);
  border-radius: 8px;
  transition: background-color 0.3s ease;
  color: #fff;

  &:hover {
    background-color: var(--primary-darken-color);
  }

  @media (max-width: 768px) {
    padding: 10px;
    border-radius: 6px;
  }
`;

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchMovies = async () => {
    try {
      const results = await getSearch(query, page);

      if (page === 1) {
        // 첫 페이지일 경우 이전 결과를 덮어씀
        setMovieList(results);
      } else {
        // 그 외 페이지일 경우 기존 목록에 추가
        setMovieList((prevMovies) => [...prevMovies, ...results]);
      }
    } catch (err) {
      setError(err.message);
      console.error("에러:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchMovies(page);
    }
  }, [query, page]);

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
    <MoviePage>
      {movieList.length === 0 ? (
        <p>영화가 없습니다.</p>
      ) : (
        <>
          <MovieList>
            {movieList.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
          </MovieList>

          {movieList.length >= 20 && (
            <ButtonWrapper>
              <ButtonMore type="button" onClick={handleLoadMore}>더 보기</ButtonMore>
            </ButtonWrapper>
          )}
        </>
      )}
    </MoviePage>
  );
};

export default SearchResults;