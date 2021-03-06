import { createGlobalStyle, keyframes } from "styled-components";
import { fadeInLeft, fadeIn } from "react-animations";

export const appear = keyframes`${fadeIn}`;
export const appearLeft = keyframes`${fadeInLeft}`;

const GlobalStyle = createGlobalStyle`
  /********** General Styles **********/
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    font-size: 14px;
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

  h2 {
    font-size: 18px;
    margin: 5px 0 10px;
  }

  p.customParagraph {
    margin: 10px 0 0 !important;
  }

  .warning {
    font-style: italic;
    font-size: 12px;
  }

  a {
    text-decoration: underline;
    font-weight: bold;
    color: #000;
    max-width: fit-content;
    transition: .3s all;
  }

  a:hover {
    color: #2f383e;
  }

  a.miniLink {
    display: flex;
    align-self: center;

    margin-top: 15px;
    text-decoration: underline !important;
    text-transform: uppercase;
    color: #828282;
    font-size: 11px;
    white-space: nowrap;
  }

  input, select {
    border: 3px solid black;
    height: 40px;
    padding: 0 10px;
    margin-bottom: 15px;
    box-sizing: border-box;
    width: 250px;
    transition: 0.3s all;
  }

  input::placeholder {
    color: #c1c1c1;
  }

  input.disabled {
    color: #828282;
    background: #dadada;
    border-color: #dadada;
    cursor: default;
  }

  input.inputError {
    border-color: red;
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
      cursor: default;
    }
  }

  .logo-admin {
    max-width: 120px;
    margin: 20px 0;
  }

  .logo-detransp {
    max-width: 140px;
    padding-top: 10px
  }

  .logo-detransp-mini {
    max-width: 140px;
    padding-top: 10px
  }

  .devbar {
    display: flex;
    flex: 1 0 auto;
    align-items: center;
    justify-content: center;

    color: white;
    font-weight: bold;
    background: #24882b;
    padding: 7px 10px;
  }

  .warningbar {
    display: flex;
    align-items: center;
    justify-content: center;

    color: white;
    font-weight: bold;
    background: #203878;
    padding: 30px 10px;
  }

  /********** Toasts/Warnings **********/
  .toast {
    display: flex;
    justify-content: center;
    align-items: center;

    background: #afffb4;
    opacity: 0.95;
    border-top: 2px solid #026f00;
    border-radius: 5px;
    padding: 11px 5%;
    margin: 0 20px 10px;
    position: fixed;
    bottom: 0;

    &.closed {
      display: none;
    }
  }

  .toast__close {
    background: none;
    margin: 10px 0 10px 10px;
    padding: 3px 8px;
    height: auto;
    min-width: auto;
    border: 1px solid #00000029;
    border-radius: 4px;

    &:hover {
      background: #00000029;
    }
  }

  /********** Navigation Bar **********/
  nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    min-height: fit-content;

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

    a,
    .navButton {
      text-decoration: none;
      text-transform: uppercase;
      font-weight: bold;
      background: none;
      padding: 0;
      min-width:  auto;
    }

    .navButton:hover {
      color: red;
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
        min-height: fit-content;

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
        min-height: fit-content;

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
    flex: 1 0 auto;
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
        margin: 10px 0 5px;
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

    .detran {
      padding: 3px 7px;
      margin-bottom: 20px;
      width: max-content;
      font-weight: bold;
      color: #19408c;
      border-radius: 6px;
      border: 2px solid #19408c;
    }
  }

  aside {
    img {
      width: 100%;
      border-top: 1px solid #26323850;
      margin-bottom: 15px;
      box-shadow: 1px 10px 15px #d2d2d2;

      animation: 0.9s ${appearLeft} ease;

      &:active {
        opacity: 0.7;
      }
    }
  }

  /********** Default Pages **********/
  main.default {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex: none;

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

    section {
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        max-width: 300px;
        text-align: center;
        margin: 10px 0 20px;
      }
    }

    .buttonGroup {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 10px;

      a:not(:last-child) {
        margin-right: 10px;
      }

      a {
        text-decoration: none;

        &:hover {
          color: black;
        }
      }

      .buttonWide-container {
        display: flex;
        flex-direction: column;
        flex: 1;
        
        &:not(:last-child) {
          margin-right: 10px;
        }

        &.active {
          .buttonWide {
            border-color: #25d366;
          }

          h2 {
            color: #25d366;
          }
        }

      }

      .buttonWide {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        min-height: 290px;
        border: 3px solid black;
        padding: 30px 20px;
        transition: .3s all;
        cursor: pointer;

        &.metodo {
          flex: initial;
          min-height: auto;
        }

        &.select {
          display: flex;
          flex-direction: row;
          justify-content: stretch;
          min-height: auto;
          padding: 0px 0px;
          padding-right: 10px;

          h2 {
            padding-left: 10px;
            font-size: 15px;
          }

        }

        &.customHeight {
          min-height: 130px;
          justify-content: center;
          padding: 10px 20px;
        }

        &:hover {
          background: #eeeeee;
          transform: translate(0px, -5px);
        }

        .buttonWide-image {
          max-width: 125px;
        }

        & h2 {
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

        &.disabled {
          border: 3px solid #828282;
          cursor: default;

          &:hover {
            background: transparent;
            transform: none;
          }

          & h2, p {
            color: #828282;
          }

          & p {
           max-width: 270px;
          }  
        }
      }

      .buttonWide-detail {
          display: flex;
          text-align: center;
          justify-content: center;
          align-items: center;

          & p {
            font-size: 12px;
            margin: 8px;
            max-width: 160px;
          }

          & strong {
            font-size: 12px;
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
    
    .typeGroup {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      max-width: 410px;
      transition: 0.3s all;
      
      .typeButton {
        display: flex;
        justify-content: center;
        min-width: 200px;
        border: 3px solid black;
        padding: 30px 20px;
        transition: .3s all;
        cursor: pointer;

        &:hover {
          background: #eeeeee;
          transform: translate(0px, -3px);
        }

        &:not(:last-child) {
          margin-bottom: 10px;
        }

        &:nth-child(2n - 1):not(:last-child) {
          margin-right: 10px;
        }

        .typeImage {
          max-width: 50px;
        }
      }
    }
  }

  /********** Input Form **********/
  form {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: column;    

    & div:not(.rai-squares) {
      display: flex;
      flex-direction: column;
    }

    .col2 {
      flex-direction: row !important;
      
      div:not(:last-child) {
        margin-right: 10px;
      }

      div:nth-child(1n) input,
      div:nth-child(1n) select,
      div:nth-child(2n) input, 
      div:nth-child(2n) select {
        width: 120px;
      }

      label {
        width: auto;
      }
    }

    .col2-sm-first {
      flex-direction: row !important;

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

      label {
        width: auto;
      }
    }

    .col2-sm-last {
      flex-direction: row !important;

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

      label {
        width: auto;
      }
    }
    
    label {
      font-size: 14px;
      font-weight: bold;
      transition: 0.3s all;
      width: 250px;

      &.inputError {
        color: red;
      }
    }

    input, select {
      width: 250px;
    }

    .appointmentInput {
      text-transform: uppercase;
      font-weight: bold;
      text-align: center;
      text-align-last:center;
    }

    button {
      width: 250px;
    }
  }

  /********** Input Form **********/
  @media (max-width: 700px) {
    input[type="color"],
    input[type="date"],
    input[type="datetime"],
    input[type="datetime-local"],
    input[type="email"],
    input[type="month"],
    input[type="number"],
    input[type="password"],
    input[type="search"],
    input[type="tel"],
    input[type="text"],
    input[type="time"],
    input[type="url"],
    input[type="week"],
    select:focus,
    textarea {
      font-size: 16px;
    }

    main {
      flex: none;
    }

    aside {
      img {
        border-top: none;
      }
    }

    nav {
      flex-direction: column;
      border-bottom: 1px solid #26323850;
      padding: 20px 10px;
      flex: none;

      img {
        max-width: 130px;
        padding-top: 5px;
      }

      ul {
        margin-top: 15px;

        li a,
        .navButton {
          font-size: 12px;
          text-decoration: underline !important;
          height: auto;

          svg {
            font-size: 14px !important;
          }
        }
      
        li a button {
          padding: 0px;
          text-decoration: underline;
          background-color: transparent;
          font-size: 12px;
          min-width: unset;
          height: 35px;

          &:hover {
            background-color: transparent;
          }
        }
      }
    }


    main.home {
      flex: 1 0 auto;
      flex-direction: column-reverse;
      padding-top: 5px;

      header {
        margin: 0 10px;
        align-items: center;
        text-align: center;

        h1 {
          max-width: none;
          text-align: center;
          line-height: 1.1;
          font-size: 28px;
        }
      }

      img {
        position: relative;
        max-width: 90%;
        margin-left: 0;
      }
    }

    main.default {
      margin: 0 10px;

      .buttonGroup {
        flex-direction: column;

        button {
          margin-bottom: 12px;
        }

        .buttonWide-container:not(:last-child) {
          margin-right: 0;
          margin-bottom: 12px;
        }
      }

      .typeGroup {
        flex-direction: column;

        .typeButton:nth-child(2n - 1):not(:last-child) {
          margin-right: 0;
        }
      }
    }
    
    footer section {
      flex-direction: column;

      div:not(:last-child) {
        margin-bottom: 30px;
      }

      &.footerTop {
        flex: none;
      }

      &.footerTop p, &.footerTop strong {
        font-size: 14px;
      }

      &.footerBottom {
        padding: 10px;
        flex: none;
        
        .copyright {
          margin-right: 0;
        }

        .logoWrapper {
          margin: 15px 0;
        }
        
        p {
          text-align: center;
        }
      }
    }
  }
`;

export default GlobalStyle;
