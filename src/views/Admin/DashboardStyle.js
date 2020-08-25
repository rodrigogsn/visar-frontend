import styled from "styled-components";

const Style = styled.div`
  padding: 1rem;

  h1 {
    padding: 1.5em 0 0.5em;
  }

  table {
    border-spacing: 0;
    border: 1px solid #e6e6e6;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #e6e6e6;
      border-right: 1px solid #e6e6e6;
      white-space: nowrap;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

export default Style;
