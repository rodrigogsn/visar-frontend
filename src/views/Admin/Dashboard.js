import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import { useTable, useSortBy, usePagination } from "react-table";
import { Loader } from "./../../components/Elements";
import styled from "styled-components";
import columns from "./columns";
import moment from "moment";

import api from "./../../services/api";
// import MainContext from "./../../MainContext";

const Dashboard = () => {
  // const history = useHistory();

  const [appointments, setAppointments] = useState([]);

  const [todayList, setTodayList] = useState([]);

  const [tomorrowList, setTomorrowList] = useState([]);

  const [updateButtonText, setUpdateButtonText] = useState("Atualizar");

  // const [toggleScreen, setToggleScreen] = useState(false);

  const handleFilter = (data, day) => {
    const result = data.filter((e) => e.date === day && e.status);

    const sort = result.sort(function (a, b) {
      let timeA = a.time;
      let timeB = b.time;

      if (timeA < timeB) {
        return -1;
      }

      if (timeA > timeB) {
        return 1;
      }

      return 0;
    });

    return sort;
  };

  const handleNextWorkday = () => {
    const weekday = moment().day();

    switch (weekday) {
      case 5:
        var next = 3;
        break;
      case 6:
        var next = 2;
        break;
      default:
        var next = 1;
    }

    return next;
  };

  const handleAppointments = () => {
    setUpdateButtonText(<Loader />);

    api
      .get("/appointments")
      .then((response) => {
        setUpdateButtonText("Atualizar");

        setAppointments(response.data);

        // Filter current day
        const today = moment().format("DD/MM/YYYY");
        const filterToday = handleFilter(response.data, today);
        setTodayList(filterToday);

        // Filter next working day
        const tomorrow = moment()
          .add(handleNextWorkday(), "days")
          .format("DD/MM/YYYY");
        const filterTomorrow = handleFilter(response.data, tomorrow);
        setTomorrowList(filterTomorrow);
      })
      .catch(() => {
        setUpdateButtonText("Atualizar");

        alert("Ocorreu um erro");
      });
  };

  const Table = ({ columns, data }) => {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,

      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0 },
      },
      useSortBy,
      usePagination
    );

    // Render the UI for your table
    return (
      <>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        {pageCount > 1 && (
          <div className="pagination">
            <button
              className="button__pagination"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </button>{" "}
            <button
              className="button__pagination"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {"<"}
            </button>{" "}
            <button
              className="button__pagination"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              {">"}
            </button>{" "}
            <button
              className="button__pagination"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>{" "}
            <span>
              Página{" "}
              <strong>
                {pageIndex + 1} de {pageOptions.length}
              </strong>{" "}
            </span>
            <span>
              | Ir para:{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ width: "100px" }}
              />
            </span>{" "}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Mostrar {pageSize} agendamentos
                </option>
              ))}
            </select>
          </div>
        )}
      </>
    );
  };

  useEffect(() => {
    handleAppointments();
  }, []);

  return (
    <Style>
      <div className="dashboardHeader">
        <div className="dashboardHeader__title">
          <h1>Agendamentos</h1>

          <button className="button" onClick={handleAppointments}>
            {updateButtonText}
          </button>
        </div>
      </div>

      <h2>Hoje</h2>

      {todayList.length !== 0 ? (
        <Table columns={columns} data={todayList} />
      ) : (
        <span className="empty">Sem agendamentos ainda.</span>
      )}

      <h2>Próximo dia útil</h2>

      {tomorrowList.length !== 0 ? (
        <Table columns={columns} data={tomorrowList} />
      ) : (
        <span className="empty">Sem agendamentos ainda.</span>
      )}

      <h2>Todos</h2>

      <Table columns={columns} data={appointments} />

      <footer></footer>
    </Style>
  );
};

const Style = styled.div`
  .dashboardHeader {
    padding: 1rem 3rem 0;

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
`;

export default Dashboard;
