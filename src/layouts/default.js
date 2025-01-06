import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';
import Search from '../components/Search';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const LayoutMain = styled.main`
  flex: 1;
  padding-bottom: 20px;
`;

const Default = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      
      <LayoutMain>
        <Search />

        {children}
      </LayoutMain>
      
      <Footer />
    </LayoutContainer>
  );
};

export default Default;
