import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --font-size: 16px;
    --primary-color: ${({ theme }) => theme.colors.primary};
    --primary-darken-color: ${({ theme }) => theme.colors.primaryDark};
    --secondary-color: ${({ theme }) => theme.colors.secondary};
    --primary-bg-color: ${({ theme }) => theme.colors.primaryBg};
    --primary-text-color: ${({ theme }) => theme.colors.primaryText};
    --primary-border-color: ${({ theme }) => theme.colors.primaryBorder};
    --tab-bg-color: ${({ theme }) => theme.colors.tabBg};
    --swiper-bg-color: ${({ theme }) => theme.colors.swiperBg};
    --swiper-hover-bg-color: ${({ theme }) => theme.colors.swiperHoverBg};
    --swiper-icon-color: ${({ theme }) => theme.colors.swiperIcon};
    --card-poster-bg-color: ${({ theme }) => theme.colors.cardPosterBg};
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
    transition: background-color 0.3s ease;
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

  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: keep-all
  }
`;

export default GlobalStyle;