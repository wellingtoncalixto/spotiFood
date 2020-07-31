import { createGlobalStyle } from 'styled-components';
import background from '../assets/background.jpg';

export default createGlobalStyle`
    * {
    margin:0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: url(${background}) no-repeat center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    -webkit-font-smoothing: antialiased;
    background-attachment: fixed;

    @media (max-width: 1200px){
      background: url(${background}) no-repeat;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
      -webkit-font-smoothing: antialiased;
      background-position: bottom;
    }

    @media (max-width: 1200px) {
      background:#851D28;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
      -webkit-font-smoothing: antialiased; 
    }
   
  }

 

  body, html, #root {
    width: 100%;
  }


  body, input, button {
    font-family: "Roboto Slab", serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }
  button {
    cursor: pointer
  }

  ::-webkit-scrollbar {
    width: 3px;
  }
`;
