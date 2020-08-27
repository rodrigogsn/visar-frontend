import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTable } from "react-table";
import Style from "./DashboardStyle";
import styled from "styled-components";
import moment from "moment";

import api from "./../../services/api";
import MainContext from "./../../MainContext";

const Dashboard = () => {
  const history = useHistory();

  const [appointments, setAppointments] = useState([]);
  const [todayList, setTodayList] = useState([]);
  const [tomorrowList, setTomorrowList] = useState([]);
  const [toggleScreen, setToggleScreen] = useState(false);

  const today = moment();

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

  const handleAppointments = () => {
    api
      .get("/appointments")
      .then((response) => {
        setAppointments(response.data);

        const today = moment().format("DD/MM/YYYY");

        const filterToday = response.data.filter(
          (e) => e.date === today && e.status
        );

        const tomorrow = moment().add(1, "days").format("DD/MM/YYYY");

        const filterTomorrow = response.data.filter(
          (e) => e.date === tomorrow && e.status
        );

        setTodayList(filterToday);

        setTomorrowList(filterTomorrow);
      })
      .catch(() => {
        alert("Ocorreu um erro");
      });
  };

  const columns = [
    {
      Header: "Agendamento",
      columns: [
        {
          Header: "#",
          accessor: "id",
        },
        {
          Header: "Status",
          Cell: (e) => (
            <span className={`tag status${e.row.original.status}`}>
              {e.row.original.full_status.name}
            </span>
          ),
        },
        {
          Header: "Data e Hora",
          Cell: (e) => (
            <span>
              {e.row.original.date} {e.row.original.time}
            </span>
          ),
        },
      ],
    },
    {
      Header: "Cliente",
      columns: [
        {
          Header: "ID",
          accessor: "user_id",
        },
        {
          Header: "Nome",
          Cell: (e) => <span>{e.row.original.full_profile.name}</span>,
        },
        {
          Header: "Telefone",
          Cell: (e) => (
            <span>
              ({e.row.original.full_profile.area_code}){" "}
              {e.row.original.full_profile.phone}
            </span>
          ),
        },
        {
          Header: "Email",
          Cell: (e) => <span>{e.row.original.full_user.email}</span>,
        },
      ],
    },
    {
      Header: "Localização",
      columns: [
        {
          Header: "Local",
          Cell: (e) => (
            <span className={`tag spot${e.row.original.spot}`}>
              {e.row.original.full_spot.name}
            </span>
          ),
        },
        {
          Header: "Cidade",
          Cell: (e) =>
            !e.row.original.full_spot.freetax && (
              <span className={`tag`}>{e.row.original.city}</span>
            ),
        },
        {
          Header: "Endereço",
          Cell: (e) =>
            !e.row.original.full_spot.freetax && (
              <span>
                {e.row.original.address}, {e.row.original.address_number} -{" "}
                {e.row.original.district}
              </span>
            ),
        },
        {
          Header: "Complemento",
          Cell: (e) =>
            !e.row.original.full_spot.freetax && (
              <span>{e.row.original.address2}</span>
            ),
        },
        {
          Header: "CEP",
          Cell: (e) =>
            !e.row.original.full_spot.freetax && (
              <span>{e.row.original.zipcode}</span>
            ),
        },
      ],
    },
    {
      Header: "Veículo",
      columns: [
        {
          Header: "Placa",
          Cell: (e) => (
            <span className={`plate`}>{e.row.original.full_vehicle.plate}</span>
          ),
        },
        {
          Header: "Categoria/Subcategoria",
          Cell: (e) => (
            <span>
              {e.row.original.full_category.name}/
              {e.row.original.full_subcategory.name}
            </span>
          ),
        },
        {
          Header: "Marca",
          Cell: (e) => <span>{e.row.original.full_vehicle.brand}</span>,
        },
        {
          Header: "Modelo",
          Cell: (e) => <span>{e.row.original.full_vehicle.model}</span>,
        },
        {
          Header: "Ano",
          Cell: (e) => <span>{e.row.original.full_vehicle.year}</span>,
        },
        {
          Header: "AE",
          Cell: (e) => <span>{e.row.original.full_vehicle.detran}</span>,
        },
        {
          Header: "RENAVAM",
          Cell: (e) => <span>{e.row.original.full_vehicle.renavam}</span>,
        },
      ],
    },
    {
      Header: "Transação",
      columns: [
        {
          Header: "Método",
          Cell: (e) => (
            <span className={`tag method`}>
              {e.row.original.full_method.name}
            </span>
          ),
        },
        {
          Header: "Total",
          Cell: (e) => (
            <span
              className={`tag ${
                (e.row.original.status == 3 || e.row.original.status == 4) &&
                "success"
              }`}
            >
              R$ {e.row.original.total}
            </span>
          ),
        },
        {
          Header: "ID da Transação",
          accessor: "transaction",
        },
        {
          Header: "Criada em",
          accessor: "created_at",
        },
        {
          Header: "Atualizada em",
          accessor: "updated_at",
        },
      ],
    },
  ];

  const Table = ({ columns, data }) => {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
    });

    // Render the UI for your table
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
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
    );
  };

  useEffect(() => {
    handleAppointments();
  }, []);

  return (
    <Style>
      <h1>Agendamentos</h1>

      <h2>Hoje</h2>
      <Table columns={columns} data={todayList} />

      <h2>Amanhã</h2>
      <Table columns={columns} data={tomorrowList} />

      <h2>Todos</h2>
      <Table columns={columns} data={appointments} />

      <footer></footer>
    </Style>
  );
};

export default Dashboard;
