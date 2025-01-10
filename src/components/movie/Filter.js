import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../../api/genre";
import styled from "styled-components";

const FilterForm = styled.form`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const StyledSelectbox = styled.select`
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 4px;
  }
`;

const FilterButton = styled.button`
  padding: 8px 20px;
  background-color: var(--primary-color);
  color: #fff;
  border-radius: 6px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--primary-darken-color);
  }

  @media (max-width: 768px) {
    padding: 4px 8px;
  }
`;

const Filter = ({ onApplyFilter }) => {
  const [filters, setFilters] = useState({ genre: "", sort: "" });

  const { data: genres, isLoading, isError, error } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const submitFilter = (e) => {
    e.preventDefault();
    onApplyFilter(filters);
  };

  if (isLoading) return <p>Loading genres...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const genreOptions = genres || [];

  return (
    <FilterForm onSubmit={submitFilter}>
      <StyledSelectbox name="sort" onChange={handleChange}>
        <option value="">정렬 방식 선택</option>
        <option value="popularity.asc">인기도 오름차순</option>
        <option value="popularity.desc">인기도 내림차순</option>
        <option value="release_date.asc">개봉일 오름차순</option>
        <option value="release_date.desc">개봉일 내림차순</option>
        <option value="vote_average.asc">평점 오름차순</option>
        <option value="vote_average.desc">평점 내림차순</option>
      </StyledSelectbox>

      <StyledSelectbox name="genre" onChange={handleChange}>
        <option value="">모든 장르</option>
        {genreOptions.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </StyledSelectbox>

      <FilterButton type="submit">검색</FilterButton>
    </FilterForm>
  );
};

export default Filter;
