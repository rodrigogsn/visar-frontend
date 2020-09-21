import styled from "styled-components";

const Style = styled.div`
  header {
    position: sticky;
    top: 0;
  }

  section.dashboard {
    display: flex;

    main {
      display: flex;
      flex-direction: column;
    }

    aside {
      display: flex;
      flex-direction: column;
      background: #ffffff;
      border-right: 1px solid #dcdcdc;
      padding: 3rem 1rem;
    }

    ul {
      li {
        list-style: none;

        span {
          display: flex;
          width: fit-content;
          padding: 0.8rem;
          margin-bottom: 0.8rem;
          border-radius: 6px;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: bold;
          white-space: nowrap;
          cursor: pointer;

          &:active {
            opacity: 1;
            background-color: #7aa7ff26;
          }

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    .dashboardHeader {
      padding: 2.2rem 3rem 0;

      &__title {
        display: flex;
        align-items: center;
      }
    }

    h2 {
      font-size: 24px;
      text-decoration: underline;
      padding: 1rem 3rem 0.1rem;
    }

    .empty {
      display: flex;
      padding: 1rem 3rem 3rem;
    }

    .button,
    .button__pagination {
      border-radius: 8px;
      margin: 10px;
      padding: 10px 20px;
      box-shadow: 1px 3px 6px #2560d21f;
      text-transform: uppercase;
      font-weight: bold;
      cursor: pointer;
      transition: 0.3s all;
      height: auto;
      min-width: 120px;

      &__pagination {
        background: white;
        height: 40px;
        min-width: 40px;
        margin: 0;

        &:hover {
          background: #ffc300;
        }
      }

      &:active {
        opacity: 0.8;
      }
    }

    footer {
      height: 20px;
      width: 100%;
      border: 0;
      background-color: #19408c;
      bottom: 0;
    }

    table {
      padding: 0 3rem 1rem;
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
          background-color: #f7f7f7;
          border: 1px solid #828282;
          color: #828282;
        }

        &.spot2 {
          background-color: #f6faff;
          border: 1px solid #2560d2;
          color: #2560d2;
        }

        &.location {
          background-color: #f7f7f7;
          border: 1px solid #828282;
          color: #828282;
        }

        &.method {
          background-color: #ffffff;
          border: 1px solid #15d05b;
          color: #15d05b;
        }
      }
    }

    .pagination {
      padding: 0 3rem 3rem;
    }
  }
`;

export default Style;