import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import styled from 'styled-components';
import Search from '../components/movie/Search';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const LayoutMain = styled.main`
  flex: 1;
  padding-bottom: 20px;
`;

const Default = ({ children, toggleTheme }) => {
  return (
    <LayoutContainer>
      <Header toggleTheme={toggleTheme} />
      
      <LayoutMain>
        <Search />

        {children}
      </LayoutMain>
      
      <Footer />
    </LayoutContainer>
  );
};

export default Default;
