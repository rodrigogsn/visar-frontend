import { createGlobalStyle, keyframes } from "styled-components";
import { fadeInLeft, fadeOutLeft } from "react-animations";

export const fadeIn = keyframes`${fadeInLeft}`;
export const fadeOut = keyframes`${fadeOutLeft}`;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

  /********** General Styles **********/
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    font-size: 14px;
    color: #000;
    font-family: "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
  }

  h1 {
    font-size: 32px;
  }

  a {
    text-decoration: underline;
    font-weight: bold;
    transition: .3s all;
  }

  a:hover {
    color: #2f383e;
  }

  button {
    background: #ffc300;
    padding: 20px 20px;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    cursor: pointer;
    transition: .3s all;
  }

  button:hover {
    background: #f5a30a;
  }

  /********** Navigation Bar **********/
  nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;

    img {
      max-width: 125px;
    }
    
    ul {
      display: flex;
      align-items: center;
    }

    li {
      list-style: none;

      &:not(:last-child) {
        margin-right: 35px;
      }
    }

    a {
      text-decoration: none;
      text-transform: uppercase;
      font-weight: bold;
    }
  }

  /********** Footer **********/
  footer {
    display: flex;
    flex-direction: column;
    border-top: 1px solid #26323850;

    section {
      display: flex;
      flex-direction: row;

      div {
        display: flex;
        flex-direction: column;
        flex: 1;

        .row {
          display: flex;
          flex-direction: row;

          p {
            margin-right: 15px;
          }
        }

        &:not(:last-child) {
          margin-right: 50px;
        }
      }

      &.footerTop {
        padding: 2.5% 50px;

        h3 {
          color: #263238;
          font-size: 16px;
          margin-bottom: 10px;
        }

        h4 {
          color: #263238;
          font-size: 12px;
          margin-top: 10px;
          margin-bottom: 5px; 
        }
        
        p, strong {
          color: #263238;
          font-size: 12px;
        }
      }

      &.footerBottom {
        background: #19408c;
        padding: 1.5% 50px;
        align-items: center;

        .copyright {
          flex: 2;
        }

        .logoWrapper:last-child {
          flex-direction: row-reverse;

          img {
            max-width: 64px;
          }
        }

        p, strong {
          color: white;
          font-size: 12px;
        }
      }
    }
  }

  /********** Home **********/
  main.home {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 0 100px;
    animation: 0.9s ${fadeIn} ease;

    header {
      display: flex;
      flex-direction: column;
      margin-left: -110px;

      h1 {
        max-width: 65%;
        animation: 0.2s ${fadeIn} ease;
      }

      p {
        max-width: 300px;
        margin: 10px 0 20px;
        animation: 0.5s ${fadeIn} ease;
      }

      a {
        max-width: -moz-fit-content;
        max-width: -webkit-fit-content;
      }

      button {
        animation: 1s ${fadeIn} ease;
      }
    }

    img {
      max-width: 500px;
      position: absolute;
      z-index: -1;
      margin-left: 160px;
      animation: 0.3s ${fadeIn} ease;
    }
  }

`;
export default GlobalStyle;
