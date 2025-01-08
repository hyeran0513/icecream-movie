import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import usePortal from "../../hooks/usePortal";
import { BiSolidStar, BiSolidAlarm, BiX } from "react-icons/bi";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: var(--primary-bg-color);
  color: var(--primary-text-color);
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ModalHeader = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ModalHeaderInfo = styled.div``;

const ModalTitle = styled.h3`
  margin-bottom: 0.5rem;
`;

const ModalMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ModalVote = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 1rem;

  svg {
    color: var(--primary-color);
  }
`;

const ModalRuntime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 1rem;

  svg {
    color: var(--primary-color);
  }
`;

const ModalBody = styled.div`
  flex-grow: 1;
  padding-top: 20px;
  font-size: 1rem;
   max-height: 60vh;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Modal = ({ isOpen, onClose, movie, review, children }) => {
  const portalRoot = usePortal("modal-root");

  return ReactDOM.createPortal(
    <ModalContainer isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalHeaderInfo>
            {movie && movie.title ? (
              <ModalTitle>{movie.title}</ModalTitle>
            ) : (
              <ModalTitle>영화 정보 없음</ModalTitle>
            )}

            {movie && (movie.vote_average || movie.vote_average === 0) && (movie.runtime || movie.runtime === 0) && (
              <ModalMeta>
                <ModalVote>
                  <BiSolidStar />
                  {movie.vote_average}
                </ModalVote>
                <ModalRuntime>
                  <BiSolidAlarm /> 상영 시간 {movie.runtime}분
                </ModalRuntime>
              </ModalMeta>
            )}
          </ModalHeaderInfo>

          <CloseButton onClick={onClose}>
            <BiX />
          </CloseButton>
        </ModalHeader>

        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalContainer>,
    portalRoot
  );
};

export default Modal;