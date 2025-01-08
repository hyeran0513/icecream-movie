import React from "react";
import styled from "styled-components";

const BannerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  height: 200px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("${process.env.PUBLIC_URL}/images/bg/bg_banner.png") no-repeat center / cover;
    z-index: -1;
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;
    height: 100px;
  }
`;

const BannerTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.2rem; 
  }
`;

const Banner = ({ title }) => {
  return (
    <BannerContainer>
      <BannerTitle>{title}</BannerTitle>
    </BannerContainer>
  );
};

export default Banner;