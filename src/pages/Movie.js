import React, { useEffect, useState } from "react";
import { getGenres } from "../api/genre";
import { getDiscovery } from "../api/discovery";
import styled from "styled-components";
import Card from "../components/movie/Card";

const MoviePage = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`;

const Utility = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const GenreSelect = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
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
  color: #fff;

  &:hover {
    background-color: var(--primary-darken-color);
  }
`;

const Movie = () => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [page, setPage] = useState(1);

  const fetchGenres = async () => {
    try {
      const genresData = await getGenres();
      setGenres(genresData);
    } catch (err) {
      setError(err.message);
      console.error("에러:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDiscovery = async (page) => {
    try {
      const discoveryData = await getDiscovery(selectedGenre, page);
      setMovieList((prevMovies) => [...prevMovies, ...discoveryData]);
    } catch (err) {
      setError(err.message);
      console.error("에러:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchDiscovery(page);
  }, [selectedGenre, page]);

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
      <Utility>
        <GenreSelect
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">모든 장르</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </GenreSelect>
      </Utility>

      {movieList.length === 0 ? (
        <p>영화가 없습니다.</p>
      ) : (
        <>
          <MovieList>
            {movieList.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
          </MovieList>

          <ButtonWrapper>
            <ButtonMore type="button" onClick={handleLoadMore}>
              더 보기
            </ButtonMore>
          </ButtonWrapper>
        </>
      )}
    </MoviePage>
  );
};

export default Movie;