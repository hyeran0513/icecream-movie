import React from "react";
import styled from "styled-components";
import { BiX } from "react-icons/bi";
import usePortal from "../../hooks/usePortal";
import ReactDOM from 'react-dom';
import { BiSolidStar, BiSolidAlarm } from "react-icons/bi";

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
  background-color: #222;
  padding: 20px;
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
  padding: 20px 0;
  font-size: 1rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Modal = ({ isOpen, onClose, movie, children }) => {
  // usePortal로 portal-root 가져오기
  const portalRoot = usePortal('modal-root');
  
  return ReactDOM.createPortal(
    <ModalContainer isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalHeaderInfo>
            <ModalTitle>{movie.title}</ModalTitle>
            
            <ModalMeta>
              <ModalVote><BiSolidStar />{movie.vote_average}</ModalVote>
              <ModalRuntime><BiSolidAlarm /> 상영 시간 {movie.runtime}분</ModalRuntime>
            </ModalMeta>
          </ModalHeaderInfo>

          <CloseButton onClick={onClose}>
            <BiX />
          </CloseButton>
        </ModalHeader>

        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalContainer>,
    portalRoot // 포탈의 root를 container에 렌더링
  );
};

export default Modal;
