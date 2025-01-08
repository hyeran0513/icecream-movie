import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import styled, { css } from "styled-components";
import { BiSun, BiMoon  } from "react-icons/bi";

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
`;
const HeaderInner = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
`;

const Logo = styled(Link)`
  display: inline-block;
  width: 180px;
  height: 24px;
  overflow: hidden; 
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
  margin-left: auto;
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
`;

const Header = ({ toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);

  // 스크롤 핸들러
  const handleScroll = () => {
    if (window.scrollY > 80) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <HeaderContainer scrolled={scrolled}>
      <HeaderInner>
        <Logo to="/">
          <LogoImage src="/images/logo.svg" alt="" />
        </Logo>

        <Gnb>
          <NavItem to="/popular">인기</NavItem>
          <NavItem to="/nowPlaying">현재 상영 중</NavItem>
          <NavItem to="/upcoming">개봉 예정</NavItem>
          <NavItem to="/topRate">높은 평점</NavItem>
          <NavItem to="/movie">장르별 영화</NavItem>
        </Gnb>

        <Utility>
          <ToggleTheme type="button" onClick={toggleTheme}>
            {localStorage.getItem("theme") === 'light' ? <BiMoon /> : <BiSun />}
          </ToggleTheme>
        </Utility>
      </HeaderInner>
    </HeaderContainer>
  )
}

export default Header