import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getSearch } from "../api/search";
import Card from "../components/movie/Card";
import { useInfiniteQuery } from "@tanstack/react-query";

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

  const fetchMovies = async ({ pageParam = 1 }) => {
    const searchData = await getSearch(query, pageParam);
    return { data: searchData, nextPage: pageParam + 1 };
  };

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["searchMovies", query],
      queryFn: fetchMovies,
      getNextPageParam: (lastPage) => {
        return lastPage.data.length > 0 ? lastPage.nextPage : undefined;
      },
    });

  const movieList = data?.pages.flatMap((page) => page.data) || [];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
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

          {hasNextPage && (
            <ButtonWrapper>
              <ButtonMore type="button" onClick={() => fetchNextPage()}>
                더 보기
              </ButtonMore>
            </ButtonWrapper>
          )}
        </>
      )}
    </MoviePage>
  );
};

export default SearchResults;