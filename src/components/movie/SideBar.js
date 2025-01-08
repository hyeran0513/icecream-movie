import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes, css } from "styled-components"; 
import { BiX } from "react-icons/bi";

const slideIn = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const SideBarContainer = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  background-color: var(--primary-bg-color);
  animation: ${({ isSidebarOpen }) =>
    isSidebarOpen
      ? css`${slideIn} 0.3s ease`
      : css`${slideOut} 0.3s ease`};
  display: ${({ isSidebarOpen }) => isSidebarOpen ? 'block' : 'none'};
`;

const SideBarContent = styled.div`
  color: var(--primary-text-color);
  border-radius: 8px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const SideBarHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 1.5rem;
  font-weight: bold;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 0 20px;
    height: 50px;
  }
`;

const SideBarBody = styled.div`
  flex-grow: 1;
  padding: 20px;
  font-size: 1rem;
`;

const Gnb = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavItem = styled(Link)`
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const SideBar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <SideBarContainer isSidebarOpen={isSidebarOpen}>
      <SideBarContent>
        <SideBarHeader>
          <CloseButton onClick={toggleSidebar}>
            <BiX />
          </CloseButton>
        </SideBarHeader>

        <SideBarBody>
          <Gnb>
            <NavItem to="/popular" onClick={toggleSidebar}>인기</NavItem>
            <NavItem to="/nowPlaying" onClick={toggleSidebar}>현재 상영 중</NavItem>
            <NavItem to="/upcoming" onClick={toggleSidebar}>개봉 예정</NavItem>
            <NavItem to="/topRate" onClick={toggleSidebar}>높은 평점</NavItem>
          </Gnb>
        </SideBarBody>
      </SideBarContent>
    </SideBarContainer>
  );
};

export default SideBar;
