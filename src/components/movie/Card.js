import React, { useState } from "react";
import styled from "styled-components";
import { css } from "styled-components";
import Modal from "./Modal";
import { getDetail } from "../../api/detail";

const CardPosterWrapper = styled.div`
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

const CardPoster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 20px;
  width: 100%;
  background: linear-gradient(
    to top,
    rgba(218, 65, 152, 0.8),
    rgba(0, 0, 0, 0)
  );
  opacity: 0;
  visibility: hidden;
  transform: translateY(20%);
  transition: transform 0.3s ease, opacity 0.3s ease;
`;

const CardItem = styled.li`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    ${CardInfo} {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    ${CardPosterWrapper} {
      &::before {
        opacity: 1;
        visibility: visible;
      }
    }
  }
`;

const CardTitle = styled.h2`
  margin-bottom: 0.2rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

const CardOverview = styled.div`
  ${({ ellipsis, theme }) =>
    ellipsis &&
    css`
      ${theme.ellipsis}
    `}
`;

const Tab = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

const TabItem = styled.li`
  padding: 4px 10px;
  background-color: #333;
  border-radius: 4px;
`;

const Card = ({ movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movieDetail, setMovieDetail] = useState(null);

  const openModal = async () => {
    if (!movie || !movie.id) return;

    setLoading(true);

    try {
      const detailData = await getDetail({ movieId: movie.id });
      console.log(detailData);
      setMovieDetail(detailData);
      setIsModalOpen(true);
    } catch (err) {
      setError(err.message);
      console.error("에러:", err);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <CardItem key={movie.id} onClick={openModal}>
        <CardPosterWrapper>
          <CardPoster
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </CardPosterWrapper>

        <CardInfo>
          <CardTitle>{movie.title}</CardTitle>
          <CardOverview ellipsis>{movie.overview}</CardOverview>
        </CardInfo>
      </CardItem>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        movie={movieDetail ? movieDetail : ''}
      >
        {movieDetail ? (
          <div>
            <p>{movieDetail.overview ? movieDetail.overview : '해당 영화에 대한 설명이 없습니다.'}</p>

            {movieDetail.genres.length > 0 ? (
              <Tab>
                {movieDetail.genres.map((genre) => (
                  <TabItem key={genre.id}>{genre.name}</TabItem>
                ))}
              </Tab>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <p>상세 정보를 불러오는 중...</p>
        )}
      </Modal>
    </>
  );
};

export default Card;