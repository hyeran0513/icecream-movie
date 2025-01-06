import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BiSun, BiMoon  } from "react-icons/bi";

const HeaderContainer = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  width: 100%;
  height: 80px;
`;

const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
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

const Utility = styled.div``;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderInner>
        <Logo to="/">
          <LogoImage src="/images/logo.svg" alt="" />
        </Logo>

        <Utility>
          <BiMoon />
        </Utility>
      </HeaderInner>
    </HeaderContainer>
  )
}

export default Header