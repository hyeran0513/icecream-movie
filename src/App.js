import React, { useState, useEffect } from "react";
import GlobalStyle from "./styles/GlobalStyle";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/default";
import SubLayout from "./layouts/subLayout";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import { lightTheme, darkTheme } from "./styles/Theme";
import { ThemeProvider } from "styled-components";
import SearchResult from "./pages/SearchResult";
import NowPlaying from "./pages/NowPlaying";
import Upcoming from "./pages/Upcoing";
import TopRate from "./pages/TopRate";
import Popular from "./pages/Popular";

function App() {
  const [theme, setTheme] = useState("light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  // 테마 토글 함수
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <div className="App">
        <GlobalStyle />

        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <DefaultLayout toggleTheme={toggleTheme} toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
                  <Home />
                </DefaultLayout>
              }
            />
            <Route
              path="/search"
              element={
                <DefaultLayout toggleTheme={toggleTheme} toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
                  <SearchResult />
                </DefaultLayout>
              }
            />
            <Route
              path="/popular"
              element={
                <SubLayout toggleTheme={toggleTheme} toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
                  <Popular />
                </SubLayout>
              }
            />
            <Route
              path="/nowplaying"
              element={
                <SubLayout toggleTheme={toggleTheme} toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
                  <NowPlaying />
                </SubLayout>
              }
            />
            <Route
              path="/upcoming"
              element={
                <SubLayout toggleTheme={toggleTheme} toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
                  <Upcoming />
                </SubLayout>
              }
            />
            <Route
              path="/topRate"
              element={
                <SubLayout toggleTheme={toggleTheme} toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
                  <TopRate />
                </SubLayout>
              }
            />
            <Route
              path="/movie"
              element={
                <SubLayout toggleTheme={toggleTheme} toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
                  <Movie />
                </SubLayout>
              }
            />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;