import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { css } from "styled-components";

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

const MoviePosterWrapper = styled.div`
  position: relative;  
  aspect-ratio: 1 / 1.5;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    display: inline-block;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease;
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MovieInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 20px;
  width: 100%;
  background: linear-gradient(to top, rgba(218, 65, 152, 0.8), rgba(0, 0, 0, 0));
  opacity: 0;
  visibility: hidden;
  transform: translateY(20%);
  transition: transform 0.3s ease, opacity 0.3s ease;
`;

const MovieItem = styled.li`
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    ${MovieInfo} {
      opacity: 1;
       visibility: visible;
      transform: translateY(0);
    }

    ${MoviePosterWrapper} {
      &::before {
        opacity: 1;
        visibility: visible;
      }
    }
  }
`;

const MovieTitle = styled.h2`
  margin-bottom: 0.2rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

const MovieOverview = styled.div`
  ${({ ellipsis, theme }) =>
    ellipsis &&
    css`
      ${theme.ellipsis}
    `}
`;

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const Movie = () => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  const getGenres = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
        params: {
          api_key: API_KEY,
          language: "ko-KR",
        },
      });
      setGenres(response.data.genres || []);
    } catch (err) {
      setError(err.message);
      console.error("에러:", err);
    }
  };

  const getMovie = async () => {
    try {
      const params = {
        api_key: API_KEY,
        language: "ko-KR",
        page: 2,
      };

      if (selectedGenre) {
        params.with_genres = selectedGenre;
      }

      const response = await axios.get(`${BASE_URL}/discover/movie`, {
        params,
      });
      setMovieList(response.data.results || []);
    } catch (err) {
      setError(err.message);
      console.error("에러:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGenres();
  }, []);

  useEffect(() => {
    getMovie();
  }, [selectedGenre]);

  if (loading) {
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
        <MovieList>
          {movieList.map((movie) => (
            <MovieItem key={movie.id}>
              <MoviePosterWrapper>
                <MoviePoster
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </MoviePosterWrapper>

              <MovieInfo>
                <MovieTitle>{movie.title}</MovieTitle>
                <MovieOverview ellipsis>{movie.overview}</MovieOverview>
              </MovieInfo>
            </MovieItem>
          ))}
        </MovieList>
      )}
    </MoviePage>
  );
};