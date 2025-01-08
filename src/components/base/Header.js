import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from "styled-components";
import { BiSun, BiMoon, BiMenu } from "react-icons/bi";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  padding: 10px 0;
  width: 100%;
  height: 80px;
  z-index: 101;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  ${(props) =>
    props.scrolled &&
    css`
      background-color: var(--primary-bg-color);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06), 0 4px 8px rgba(0, 0, 0, 0.1);
    `}

  @media (max-width: 768px) {
    height: 50px;
  }
`;

const HeaderInner = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Logo = styled(Link)`
  display: inline-block;
  width: 180px;
  height: 24px;
  overflow: hidden;

  @media (max-width: 1024px) {
    width: 140px;
    height: 20px;
  }

  @media (max-width: 768px) {
    width: 120px;
    height: 16px;
  }
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Gnb = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const NavItem = styled(Link)``;

const Utility = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const ToggleTheme = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--primary-bg-color);
  }

  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
`;

const ButtonMenu = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--primary-bg-color);
  }

  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
`;

const Header = ({ toggleTheme, toggleSidebar }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  // 스크롤 핸들러
  const handleScroll = () => {
    if (window.scrollY > 80) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  // 화면 크기 변화 감지
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1024);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <HeaderContainer scrolled={scrolled}>
      <HeaderInner>
        <Logo to="/">
          <LogoImage src={`${process.env.PUBLIC_URL}/images/logo.svg`} alt="" />
        </Logo>

        {!isMobile ? (
          <Gnb>
            <NavItem to="/popular">인기</NavItem>
            <NavItem to="/nowPlaying">현재 상영 중</NavItem>
            <NavItem to="/upcoming">개봉 예정</NavItem>
            <NavItem to="/topRate">높은 평점</NavItem>
          </Gnb>
        ) : null}

        <Utility>
          <ToggleTheme type="button" onClick={toggleTheme}>
            {localStorage.getItem("theme") === 'light' ? <BiMoon /> : <BiSun />}
          </ToggleTheme>

          {isMobile && (
            <ButtonMenu type="button" onClick={toggleSidebar}>
              <BiMenu />
            </ButtonMenu>
          )}
        </Utility>
      </HeaderInner>
    </HeaderContainer>
  );
};

export default Header;