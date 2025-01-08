import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/default";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import theme from "./styles/Theme";
import { ThemeProvider } from "styled-components";
import SearchResult from "./pages/SearchResult";
import NowPlaying from "./pages/NowPlaying";
import Upcoming from "./pages/Upcoing";
import TopRate from "./pages/TopRate";
import Popular from "./pages/Popular";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <GlobalStyle />

        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <DefaultLayout>
                  <Home />
                </DefaultLayout>
              }
            />

            <Route
              path="/movie"
              element={
                <DefaultLayout>
                  <Movie />
                </DefaultLayout>
              }
            />

            <Route
              path="/search"
              element={
                <DefaultLayout>
                  <SearchResult />
                </DefaultLayout>
              }
            />

            <Route
              path="/popular"
              element={
                <DefaultLayout>
                  <Popular />
                </DefaultLayout>
              }
            />

            <Route
              path="/nowplaying"
              element={
                <DefaultLayout>
                  <NowPlaying />
                </DefaultLayout>
              }
            />

            <Route
              path="/nowplaying"
              element={
                <DefaultLayout>
                  <NowPlaying />
                </DefaultLayout>
              }
            />

            <Route
              path="/upcoming"
              element={
                <DefaultLayout>
                  <Upcoming />
                </DefaultLayout>
              }
            />

            <Route
              path="/topRate"
              element={
                <DefaultLayout>
                  <TopRate />
                </DefaultLayout>
              }
            />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;