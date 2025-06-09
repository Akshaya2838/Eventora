import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --royal-blue: #4169E1;
    --event-blue: #1E90FF;
    --neutral-light: #F5F5F5;
    --neutral-dark: #333333;
    --accent: #FFD700;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: var(--neutral-light);
    color: var(--neutral-dark);
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: var(--royal-blue);
    transition: color 0.3s;
  }

  h1, h2, h3 {
    font-weight: 600;
  }

  @media (max-width: 768px) {
    body {
      font-size: 16px;
    }
  }
`;

export default GlobalStyles;