import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const LayoutMain = styled.main`
  flex: 1;
  margin-top: 80px;
  padding-bottom: 20px;
`;

const SubLayout = ({ children, toggleTheme }) => {
  return (
    <LayoutContainer>
      <Header toggleTheme={toggleTheme} />
      
      <LayoutMain>
        {children}
      </LayoutMain>
      
      <Footer />
    </LayoutContainer>
  );
};

export default SubLayout;
