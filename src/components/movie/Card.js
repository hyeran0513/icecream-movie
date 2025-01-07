import React, { useState } from 'react'
import styled from "styled-components";
import { css } from "styled-components";
import Modal from './Modal';

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
  background: linear-gradient(to top, rgba(218, 65, 152, 0.8), rgba(0, 0, 0, 0));
  opacity: 0;
  visibility: hidden;
  transform: translateY(20%);
  transition: transform 0.3s ease, opacity 0.3s ease;
`;

const CardItem = styled.li`
  position: relative;
  overflow: hidden;
  cursor: pointer;

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

const Card = ({ movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
        title="모달 제목"
      >
        <p>모달 내용</p>
      </Modal>
    </>
  )
}

export default Card