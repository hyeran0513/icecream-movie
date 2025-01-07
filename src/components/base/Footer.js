import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.header`
  padding: 10px 0;
  height: 80px;
`;

const FooterInner = styled.div`
  display: flex;
  align-items: center;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterInner>© Copyright. 2025. KimHyeRan. Icecream Movie App</FooterInner>
    </FooterContainer>
  )
}

export default Footer