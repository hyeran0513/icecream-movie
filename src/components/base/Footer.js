import React from 'react'
import styled from 'styled-components';

const FooterContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  border-top: 1px solid var(--primary-border-color);

  @media (max-width: 768px) {
    min-height: 60px;
  }
`;

const FooterInner = styled.div`
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterInner>© Copyright. 2025. KimHyeRan. Icecream Movie App</FooterInner>
    </FooterContainer>
  )
}

export default Footer