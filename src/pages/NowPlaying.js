import React, { useState, useEffect } from "react";
import { getNowPlaying } from "../api/nowPlaying";
import styled from "styled-components";
import Card from "../components/movie/Card";

const MoviePage = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`;

const MovieList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
`;

const NowPlaying = () => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const genresData = await getNowPlaying();
        setMovieList(genresData);
      } catch (err) {
        setError(err.message);
        console.error("에러:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <MoviePage>
      <MovieList>
        {movieList.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </MovieList>
    </MoviePage>
  );
};

export default NowPlaying;