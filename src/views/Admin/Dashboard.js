import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import { useTable, useSortBy, usePagination } from "react-table";
import Style from "../../styles/Admin";
import moment from "moment";

import { Loader } from "./../../components/Elements";
import Header from "./../../components/Admin/Header";
import Sidebar from "./../../components/Admin/Sidebar";
import Columns from "./../../components/Admin/Columns";

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

    return (
      <>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}

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
      <Header />

      <section className="dashboard">
        <Sidebar />

        <main className="dashboard">
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
            <Table columns={Columns} data={todayList} />
          ) : (
            <span className="empty">Sem agendamentos ainda.</span>
          )}

          <h2>Próximo dia útil</h2>

          {tomorrowList.length !== 0 ? (
            <Table columns={Columns} data={tomorrowList} />
          ) : (
            <span className="empty">Sem agendamentos ainda.</span>
          )}

          <h2>Todos</h2>

          <Table columns={Columns} data={appointments} />
        </main>
      </section>

      <footer />
    </Style>
  );
};

export default Dashboard;
