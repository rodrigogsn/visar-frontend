import { createGlobalStyle, keyframes } from "styled-components";
import { fadeInLeft, fadeIn } from "react-animations";

export const appear = keyframes`${fadeIn}`;
export const appearLeft = keyframes`${fadeInLeft}`;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

  /********** General Styles **********/
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    font-size: 14px;
    /* color: #000; */
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

  p.customParagraph {
    margin: 10px 0 0 !important;
  }

  a {
    text-decoration: underline;
    font-weight: bold;
    transition: .3s all;
    color: #000;
    max-width: -moz-fit-content;
    max-width: -webkit-fit-content;
  }

  a:hover {
    color: #2f383e;
  }

  a.miniLink {
    margin-top: 15px;
    text-decoration: underline !important;
    text-transform: uppercase;
    color: #828282;
    font-size: 11px;
  }

  input, select {
    border: 3px solid black;
    height: 40px;
    padding: 0 10px;
    margin-bottom: 15px;
    box-sizing: border-box;
    width: 250px;
  }

  input::placeholder {
    color: #c1c1c1;
  }

  input.disabled {
    color: #828282;
    background: #dadada;
    border-color: #dadada;
  }
  
  button {
    background: #ffc300;
    padding: 10px 20px;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    cursor: pointer;
    transition: .3s all;
    height: 60px;
    min-width: 180px;
    
    &:hover {
      background: #f5a30a;
    }

    &.secondary {
      background: white;
      border: 3px solid black;
      box-sizing: border-box;
      &:hover {
        background: #dadada;
      }
    }

    &.success {
      background: #25d366;
      &:hover {
        background: #1da34f;
      }
    }

    &.disabled {
      background: #dadada;
      color: #828282;
    }
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

    .socialIcon {
      color: #263238;
    }

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
        padding: 50px 2.5% 65px;

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
    animation: 0.9s ${appearLeft} ease;

    header {
      display: flex;
      flex-direction: column;
      margin-left: -110px;

      h1 {
        max-width: 65%;
        animation: 0.2s ${appearLeft} ease;
      }

      p {
        max-width: 300px;
        margin: 10px 0 20px;
        animation: 0.5s ${appearLeft} ease;
      }

      a {
        max-width: -moz-fit-content;
        max-width: -webkit-fit-content;
      }

      button {
        animation: 1s ${appearLeft} ease;
      }
    }

    img {
      max-width: 500px;
      position: absolute;
      z-index: -1;
      margin-left: 160px;
      animation: 0.3s ${appearLeft} ease;
    }
  }


  /********** Default Pages **********/
  main.default {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 80px 0 100px;
    animation: 0.2s ${appear} ease;

    header {
      display: flex;
      flex-direction: column;
      align-items: center;

      h1 {
        text-align: center;
      }

      p {
        max-width: 300px;
        text-align: center;
        margin: 10px 0 20px;
      }
    }

    .buttonGroup {
      display: flex;
      flex-direction: row;
      margin-top: 10px;
      max-width: 600px;

      a:not(:last-child) {
        margin-right: 10px;
      }

      a {
        text-decoration: none;
      }

      .buttonWide {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        min-height: 290px;
        border: 3px solid black;
        padding: 30px 20px;
        transition: .3s all;

        &:hover {
          background: #dadada;
        }

        .buttonWide-image {
          max-width: 125px;
        }

        h2 {
          text-decoration: none;
          font-size: 24px;
          font-weight: bold;
          text-align: center;
          line-height: 1;
          margin: 15px 0;
        }

        p {
          font-weight: normal;
          text-align: center;
          line-height: 1;
        }
      }

    }

    .buttonGroup-vertical {
      display: flex;
      flex-direction: column;
      margin-top: 10px;

      a:not(:last-child) {
        margin-bottom: 15px;
      }
    }
  }

  /********** Input Form **********/
  form {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: column;    

    & div {
      display: flex;
      flex-direction: column;
    }

    .col2-sm-first {
      flex-direction: row;

      div:not(:last-child) {
        margin-right: 10px;
      }

      div:nth-child(1n) input,
      div:nth-child(1n) select {
        width: 70px;
      }

      div:nth-child(2n) input, 
      div:nth-child(2n) select {
        width: 170px;
      }
    }

    .col2-sm-last {
      flex-direction: row;

      div:not(:last-child) {
        margin-right: 10px;
      }

      div:nth-child(1n) input,
      div:nth-child(1n) select {
        width: 170px;
      }

      div:nth-child(2n) input,
      div:nth-child(2n) select {
        width: 70px;
      }
    }
    
    label {
      font-size: 14px;
      font-weight: bold;
    }

    input, select {
      width: 250px;
    }

    button {
      width: 250px;
    }
  }

`;
export default GlobalStyle;