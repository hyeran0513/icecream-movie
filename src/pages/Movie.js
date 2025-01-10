import React, { useState } from 'react';
import Filter from '../components/movie/Filter';
import styled from "styled-components";
import Banner from '../components/movie/Banner';
import { getDiscovery } from '../api/discovery';
import Card from '../components/movie/Card';
import { useQuery } from '@tanstack/react-query';

const FilterWrapper = styled.div`
  margin: 0 auto 30px;
  padding: 0 30px;
  max-width: 1260px;

  @media (max-width: 768px) {
    margin: 0 auto 20px;
    padding: 0 20px;
  }
`;

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

const Movie = () => {
  const [filterParams, setFilterParams] = useState({});

  const { data: movieList, isLoading, isError, error } = useQuery({
    queryKey: ['movies', JSON.stringify(filterParams)],
    queryFn: () => getDiscovery(filterParams),
    enabled: true,
  });

  const filterChange = (params) => {
    setFilterParams(params);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <>
      <Banner title={"사용자 선호"} />

      <FilterWrapper>
        <Filter onApplyFilter={filterChange} />
      </FilterWrapper>

      <MoviePage>
        <MovieList>
          {movieList?.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </MovieList>
      </MoviePage>
    </>
  );
};

export default Movie;