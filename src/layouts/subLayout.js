import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import styled from 'styled-components';
import SideBar from '../components/movie/SideBar';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const LayoutMain = styled.main`
  flex: 1;
  margin-top: 80px;
  padding-bottom: 20px;

  @media (max-width: 768px) {
    margin-top: 50px;
  }
`;

const SubLayout = ({ children, toggleTheme, toggleSidebar, isSidebarOpen }) => {
  return (
    <LayoutContainer>
      <Header toggleTheme={toggleTheme} toggleSidebar={toggleSidebar} />
      <SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <LayoutMain>
        {children}
      </LayoutMain>
      
      <Footer />
    </LayoutContainer>
  );
};

export default SubLayout;
