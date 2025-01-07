import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --font-size: 16px;
    --primary-color: #DA4198;
    --primary-darken-color: #C44389;
    --secondary-color: #4141DA;
    --primary-bg-color: #222;
    --primary-text-color: #fff;
    --primary-border-color: #fff;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 100%;
    scroll-behavior: smooth;
  }

  body {
    line-height: 1.5;
    font-size: 1rem;
    background-color: var(--primary-bg-color); 
    color: var(--primary-text-color);
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  ul, ol {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    max-width: 100%;
    display: block;
  }

  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }

  input, textarea, select {
    outline: none;
    border: none;
    background: none;
    padding: 0;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  a, button, input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
  }

  input[type="checkbox"], input[type="radio"] {
    appearance: none;
    background-color: transparent;
  }

  blockquote, dl, dt, dd, figure, hr, pre {
    margin: 0;
  }

  select {
    background-color: var(--primary-bg-color);
    color: var(--primary-text-color);
    border: 1px solid var(--primary-border-color);
  }
`;

export default GlobalStyle;
