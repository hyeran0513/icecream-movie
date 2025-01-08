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
    background: url("/images/bg/bg_banner.png") no-repeat center / cover;
    z-index: -1;
    opacity: 0.5;
  }
`;

const BannerContent = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 1200px;
  height: 100%;
`;

const BannerCharacter = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const BannerTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
`;

const Banner = ({ title, type }) => {
  return (
    <BannerContainer>
      <BannerContent>
        {type === 'popular' && (
          <BannerCharacter src="/images/character/character_star.png" width="130" alt="우주인 캐릭터" />
        )}

        {type === 'nowPlaying' && (
          <BannerCharacter src="/images/character/character_rocket.png" width="160" alt="우주인 캐릭터" />
        )}

        {type === 'upcoming' && (
          <BannerCharacter src="/images/character/character_flag.png" width="150" alt="우주인 캐릭터" />
        )}

        {type === 'topRate' && (
          <BannerCharacter src="/images/character/character_heart.png" width="140" alt="우주인 캐릭터" />
        )}

        <BannerTitle>{title}</BannerTitle>
      </BannerContent>
    </BannerContainer>
  );
};

export default Banner;