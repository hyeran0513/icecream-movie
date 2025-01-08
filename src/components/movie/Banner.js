import React from "react";
import styled from "styled-components";

const BannerContainer = styled.div`
  position: relative;
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

const BannerContent = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 0 30px;
  max-width: 1260px;
  height: 100%;
`;

const BannerCharacter = styled.img`
  position: absolute;
  bottom: 0;
  right: 30px;

  @media (max-width: 768px) {
    right: 20px;
    width: 60px;
  }
`;

const BannerTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.2rem; 
  }
`;

const Banner = ({ title, type }) => {
  return (
    <BannerContainer>
      <BannerContent>
        {type === 'popular' && (
          <BannerCharacter src={`${process.env.PUBLIC_URL}/images/character/character_star.png`} width="130" alt="우주인 캐릭터" />
        )}

        {type === 'nowPlaying' && (
          <BannerCharacter src={`${process.env.PUBLIC_URL}/images/character/character_rocket.png`} width="160" alt="우주인 캐릭터" />
        )}

        {type === 'upcoming' && (
          <BannerCharacter src={`${process.env.PUBLIC_URL}/images/character/character_flag.png`} width="150" alt="우주인 캐릭터" />
        )}

        {type === 'topRate' && (
          <BannerCharacter src={`${process.env.PUBLIC_URL}/images/character/character_heart.png`} width="140" alt="우주인 캐릭터" />
        )}

        <BannerTitle>{title}</BannerTitle>
      </BannerContent>
    </BannerContainer>
  );
};

export default Banner;