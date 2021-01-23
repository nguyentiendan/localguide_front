import { createGlobalStyle } from 'styled-components';
import colors from './colors';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  body {
    background: ${props => props.bodyBgColor || '#ffffff'}
    margin: 0;
    text-rendering: optimizeLegibility;
    letter-spacing: 0.3px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: ${colors.magenta[50]};
    text-decoration: none;
  }
`;

export default GlobalStyle;
