import React from 'react'
import styled from "styled-components";
import { FcAdvertising } from "react-icons/fc";

const IntroContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 20px;
  background-color: rgba(218, 65, 152, 0.3);
  border: 1px solid var(--primary-color);
  border-radius: 8px;

  svg {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    padding: 14px;

    svg {
      display: none;
    }
  }
`;

const IntroCaracter = styled.img`
  position: absolute;
  bottom: 0;
  right: 20px;
  width: 100px;

  @media (max-width: 768px) {
    right: 10px;
    width: 80px;
  }
`;

const IntroText = styled.div``;

const IntroTitle = styled.p`
  font-size: 1.2rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const IntroSubTitle = styled.div`
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Intro = () => {
  return (
    <IntroContainer>
      <IntroCaracter src={`${process.env.PUBLIC_URL}/images/character/character_headset.png`} alt="" />
      <FcAdvertising />

      <IntroText>
        <IntroTitle>최신 영화가 궁금하다면?</IntroTitle>
        <IntroSubTitle>아이스크림 무비에서 찾아보세요 🌟</IntroSubTitle>
      </IntroText>
    </IntroContainer>
  )
}

export default Intro