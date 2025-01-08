import React from 'react'
import styled from "styled-components";

const BannerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  height: 200px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/images/bg_banner.png') no-repeat center / cover;
    z-index: -1;
    opacity: 0.5;
  }
`;

const BannerTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
`;

const Banner = ({ title }) => {
  return (
    <BannerContainer>
      <BannerTitle>{title}</BannerTitle>
    </BannerContainer>
  )
}

export default Banner