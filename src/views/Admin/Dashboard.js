// import React, { useState, useContext, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import { useTable } from "react-table";
// import Style from "./DashboardStyle";
// import moment from "moment";

// import api from "./../../services/api";
// import MainContext from "./../../MainContext";

// const Dashboard = () => {
//   const history = useHistory();

//   const [appointments, setAppointments] = useState([]);
//   const [todayList, setTodayList] = useState([]);
//   const [tomorrowList, setTomorrowList] = useState([]);
//   const [screen, setScreen] = useState();

//   const handleAppointments = () => {
//     api
//       .get("/appointments")
//       .then((response) => {
//         setAppointments(response.data);

//         const today = moment().format("DD/MM/YYYY");

//         const filterToday = response.data.filter(
//           (e) => e.date === today && e.status
//         );

//         const tomorrow = moment().add("days", 1).format("DD/MM/YYYY");

//         const filterTomorrow = response.data.filter(
//           (e) => e.date === tomorrow && e.status
//         );

//         setTodayList(filterToday);

//         setTomorrowList(filterTomorrow);
//       })
//       .catch(() => {
//         alert("Ocorreu um erro");
//       });
//   };

//   const columns = [
//     {
//       Header: "Agendamento",
//       columns: [
//         {
//           Header: "#",
//           accessor: "id",
//         },
//         {
//           Header: "Status",
//           Cell: (e) => (
//             <span className={`tag status${e.row.original.status}`}>
//               {e.row.original.status}
//             </span>
//           ),
//         },
//         {
//           Header: "Data e Hora",
//           Cell: (e) => (
//             <span>
//               {e.row.original.date} {e.row.original.time}
//             </span>
//           ),
//         },
//       ],
//     },
//     {
//       Header: "Cliente",
//       columns: [
//         {
//           Header: "ID",
//           accessor: "user_id",
//         },
//         {
//           Header: "Nome",
//           Cell: (e) => <span>{e.row.original.full_profile.name}</span>,
//         },
//         {
//           Header: "Telefone",
//           Cell: (e) => (
//             <span>
//               ({e.row.original.full_profile.area_code}){" "}
//               {e.row.original.full_profile.phone}
//             </span>
//           ),
//         },
//         {
//           Header: "Email",
//           Cell: (e) => <span>{e.row.original.full_user.email}</span>,
//         },
//       ],
//     },
//     {
//       Header: "Localização",
//       columns: [
//         {
//           Header: "Local",
//           Cell: (e) => (
//             <span className={`tag spot${e.row.original.spot}`}>
//               {e.row.original.full_spot.name}
//             </span>
//           ),
//         },
//         {
//           Header: "Cidade",
//           Cell: (e) => <span className={`tag`}>{e.row.original.city}</span>,
//         },
//         {
//           Header: "Endereço",
//           Cell: (e) => (
//             <span>
//               {e.row.original.address}, {e.row.original.address_number} -{" "}
//               {e.row.original.district}
//             </span>
//           ),
//         },
//         {
//           Header: "Complemento",
//           Cell: (e) => <span>{e.row.original.address2}</span>,
//         },
//         {
//           Header: "CEP",
//           Cell: (e) => <span>{e.row.original.zipcode}</span>,
//         },
//       ],
//     },
//     {
//       Header: "Veículo",
//       columns: [
//         {
//           Header: "Placa",
//           Cell: (e) => (
//             <span className={`plate`}>{e.row.original.full_vehicle.plate}</span>
//           ),
//         },
//         {
//           Header: "Categoria/Subcategoria",
//           Cell: (e) => (
//             <span>
//               {e.row.original.full_category.name}/
//               {e.row.original.full_subcategory.name}
//             </span>
//           ),
//         },
//         {
//           Header: "Marca",
//           Cell: (e) => <span>{e.row.original.full_vehicle.brand}</span>,
//         },
//         {
//           Header: "Modelo",
//           Cell: (e) => <span>{e.row.original.full_vehicle.model}</span>,
//         },
//         {
//           Header: "Ano",
//           Cell: (e) => <span>{e.row.original.full_vehicle.year}</span>,
//         },
//         {
//           Header: "AE",
//           Cell: (e) => <span>{e.row.original.full_vehicle.detran}</span>,
//         },
//         {
//           Header: "RENAVAM",
//           Cell: (e) => <span>{e.row.original.full_vehicle.renavam}</span>,
//         },
//       ],
//     },
//     {
//       Header: "Transação",
//       columns: [
//         {
//           Header: "Método",
//           Cell: (e) => (
//             <span className={`tag`}>{e.row.original.full_method.name}</span>
//           ),
//         },
//         {
//           Header: "Total",
//           Cell: (e) => (
//             <span className={`tag success`}>{e.row.original.total}</span>
//           ),
//         },
//         {
//           Header: "ID da Transação",
//           accessor: "transaction",
//         },
//       ],
//     },
//   ];

//   const Table = ({ columns, data }) => {
//     // Use the state and functions returned from useTable to build your UI
//     const {
//       getTableProps,
//       getTableBodyProps,
//       headerGroups,
//       rows,
//       prepareRow,
//     } = useTable({
//       columns,
//       data,
//     });

//     // Render the UI for your table
//     return (
//       <table {...getTableProps()}>
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 <th {...column.getHeaderProps()}>{column.render("Header")}</th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row, i) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map((cell) => {
//                   return (
//                     <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     );
//   };

//   useEffect(() => {
//     handleAppointments();
//   }, []);

//   return (
//     <Style>
//       <h1>Agendamentos</h1>

//       <h2>Hoje</h2>
//       <Table columns={columns} data={todayList} />

//       <h2>Amanhã</h2>
//       <Table columns={columns} data={tomorrowList} />

//       <h2>Todos</h2>
//       <Table columns={columns} data={appointments} />
//     </Style>
//   );
// };

// export default Dashboard;
