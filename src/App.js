import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/default";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import theme from "./styles/Theme";
import { ThemeProvider } from "styled-components";

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
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;