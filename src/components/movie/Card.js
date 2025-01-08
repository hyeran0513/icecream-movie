import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import { getDetail } from "../../api/detail";
import { getReview } from "../../api/review";
import { BiSolidUserCircle, BiChevronDown } from "react-icons/bi";

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
  color: #fff;

  @media (max-width: 1024px) {
    padding: 10px;
  }
`;

const CardButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease;
`;

const CardDetailButton = styled.button`
  padding: 8px 20px;
  background-color: rgba(218, 65, 152, 0.5);
  border: 1px solid var(--primary-color);
  border-radius: 6px;
  z-index: 10;
  transition: background-color 0.3s ease;
  color: #fff;

  &:hover {
    background-color: rgba(218, 65, 152, 0.8);
  }

  @media (max-width: 1024px) {
    padding: 4px 8px;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    min-width: 80px;
    font-size: 1rem;
  }
`;

const CardItem = styled.li`
  position: relative;
  overflow: hidden;
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

    ${CardButtonWrapper} {
      opacity: 1;
      visibility: visible;
    }
  }

  @media (max-width: 768px) {
    border-radius: 6px;
  }
`;

const CardTitle = styled.h2`
  margin-bottom: 0.2rem;
  font-size: 1.2rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CardOverview = styled.div`
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Tab = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

const TabItem = styled.li`
  padding: 4px 10px;
  background-color: var(--tab-bg-color);
  border-radius: 4px;
  font-size: 0.8rem;
`;

const MovieOverview = styled.p``;

const ReviewContainer = styled.div`
  position: relative;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #ccc;
`;

const ShowReviewButton = styled.button`
  position: absolute;
  top: -12px;
  left: 50%;
  width: 80px;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-bg-color);
  border: 1px solid #ccc;
  border-radius: 30px;
  color: var(--primary-text-color);

  svg {
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease;
  }

  &.show {
    svg {
      transform: rotate(-180deg);
    }
  }
`;

const ReviewList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ReviewItem = styled.li``;

const ReviewAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const ReviewAvatar = styled.div`
  display: flex;
  align-items: center;
`;

const ReviewUserName = styled.div`
  font-size: 0.8rem;
`;

const ReviewContent = styled.p`
  margin-bottom: 0.5rem;
`;

const ReviewDate = styled.p`
  text-align: end;
  font-size: 0.8rem;
`;

const Card = ({ movie }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieDetail, setMovieDetail] = useState(null);
  const [movieReview, setMovieReview] = useState([]);
  const [showReview, setShowReview] = useState(false);

  const fetchMovieData = async () => {
    if (!movie || !movie.id) return;

    setLoading(true);
    try {
      const detailData = await getDetail({ movieId: movie.id });
      const reviewData = await getReview({ movieId: movie.id });

      setMovieDetail(detailData);
      setMovieReview(reviewData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieData();
  }, [movie]);

  const openDetailModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleShowReview = () => {
    setShowReview((prev) => !prev);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <CardItem key={movie.id}>
        <CardButtonWrapper>
          <CardDetailButton onClick={openDetailModal}>
            상세 보기
          </CardDetailButton>
        </CardButtonWrapper>

        <CardPosterWrapper>
          <CardPoster
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </CardPosterWrapper>

        <CardInfo>
          <CardTitle>{movie.title}</CardTitle>
          <CardOverview className="ellipsis">{movie.overview}</CardOverview>
        </CardInfo>
      </CardItem>

      {/* 상세 보기 모달 */}
      <Modal
        isOpen={isModalOpen || ''}
        onClose={closeModal}
        movie={movieDetail || ""}
        review={movieReview || []}
      >
        {movieDetail ? (
          <>
            <MovieOverview>
              {movieDetail.overview || "해당 영화에 대한 설명이 없습니다."}
            </MovieOverview>

            {movieDetail.genres.length > 0 && (
              <Tab>
                {movieDetail.genres.map((genre) => (
                  <TabItem key={genre.id}>{genre.name}</TabItem>
                ))}
              </Tab>
            )}

            <ReviewContainer>
              <ShowReviewButton
                type="button"
                onClick={handleShowReview}
                className={showReview ? "show" : ""}
              >
                <BiChevronDown />
              </ShowReviewButton>

              {showReview && (
                <ReviewList>
                  {movieReview.length ? (
                    movieReview.map((review) => (
                      <ReviewItem key={review.id}>
                        <ReviewAuthor>
                          <ReviewAvatar>
                            {review.author_details.avatar_path ? (
                              <img
                                src={`https://www.themoviedb.org/t/p/w24${review.author_details.avatar_path}`}
                                alt={review.author_details.username}
                                style={{ borderRadius: "50%" }}
                              />
                            ) : (
                              <BiSolidUserCircle />
                            )}
                          </ReviewAvatar>

                          <ReviewUserName>
                            {review.author_details.name ||
                              review.author_details.username}
                          </ReviewUserName>
                        </ReviewAuthor>

                        <ReviewContent>{review.content}</ReviewContent>

                        <ReviewDate>
                          {new Date(review.created_at).toLocaleDateString()}
                        </ReviewDate>
                      </ReviewItem>
                    ))
                  ) : (
                    <div>리뷰가 없습니다.</div>
                  )}
                </ReviewList>
              )}
            </ReviewContainer>
          </>
        ) : (
          <p>상세 정보를 불러오는 중...</p>
        )}
      </Modal>
    </>
  );
};

export default Card;