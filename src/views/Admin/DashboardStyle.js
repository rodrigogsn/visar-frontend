import styled from "styled-components";

const Style = styled.div`
  h1 {
    padding: 1rem 3rem;
  }

  h2 {
    font-size: 24px;
    text-decoration: underline;
    text-transform: uppercase;
    padding: 1rem 3rem 0.1rem;
  }

  footer {
    height: 20px;
    width: 100%;
    border: 0;
    background-color: #19408c;
  }

  table {
    padding: 0 3rem 3rem;
    border-spacing: 0;
    /* border: 1px solid #e6e6e6; */

    tr {
      :last-child {
        td {
          border-bottom: 1px solid #e6e6e6;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.8rem;
      text-align: left;
      border-bottom: 1px solid #e6e6e6;
      border-right: 0;
      white-space: nowrap;
      transition: 0.3s;

      :hover {
        background-color: #cccccc;
      }

      :last-child {
        border-right: 0;
      }
    }

    .tag {
      border-radius: 5px;
      padding: 1px 7px;
      background-color: #f5f5f5;
      border: 1px solid #dcdcdc;
      color: #adadad;

      &.status2 {
        background-color: #ffb42a;
        border: 1px solid #f9a044;
        color: #ffffff;
      }

      &.status3,
      &.success {
        background-color: #15d05b;
        border: 1px solid #1da34f;
        color: white;
      }

      &.status4 {
        background-color: #1da34f;
        border: 1px solid #1da34f;
        color: white;
      }

      &.status5,
      &.status6 {
        background-color: #9c0000;
        border: 1px solid #9c0000;
        color: white;
      }

      &.status7 {
        background-color: #ea1919;
        border: 1px solid #9c0000;
        color: white;
      }

      &.spot1 {
        /* background-color: #fff5e6;
        border: 1px solid #fff5e6;
        color: #ff6a00; */
      }

      &.spot2 {
        background-color: #e5f1ff;
        border: 1px solid #e5f1ff;
        color: #2560d2;
      }

      &.method {
        background-color: #ffffff;
        border: 1px solid #15d05b;
        color: #15d05b;
      }
    }
  }
`;

export default Style;
