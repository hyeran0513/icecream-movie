import React from "react";
import styled from "styled-components";
import { BiX } from "react-icons/bi";
import usePortal from "../../hooks/usePortal";
import ReactDOM from 'react-dom';

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
  background-color: #fff;
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
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalBody = styled.div`
  flex-grow: 1;
  padding: 20px 0;
  font-size: 1rem;
  color: #333;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Modal = ({ isOpen, onClose, title, children }) => {
  // usePortal로 portal-root 가져오기
  const portalRoot = usePortal('modal-root');

  return ReactDOM.createPortal(
    <ModalContainer isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <p>{title}</p>
          <CloseButton onClick={onClose}>
            <BiX />
          </CloseButton>
        </ModalHeader>

        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <button onClick={onClose}>닫기</button>
        </ModalFooter>
      </ModalContent>
    </ModalContainer>,
    portalRoot // 포탈의 root를 container에 렌더링
  );
};

export default Modal;
