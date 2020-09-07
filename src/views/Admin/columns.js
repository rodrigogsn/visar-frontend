import React from "react";
import moment from "moment";

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
        accessor: "status",
        Cell: (e) => (
          <span className={`tag status${e.row.original.status}`}>
            {e.row.original.full_status.name}
          </span>
        ),
      },
      {
        Header: "Data e Hora",
        accessor: (e) => {
          return moment(`${e.date} ${e.time}`, "DD/MM/YYYY HH:mm").format(
            "YYYY/MM/DD HH:mm"
          );
        },
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
        accessor: "full_profile.name",
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
            <span className={`tag location`}>{e.row.original.city}</span>
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
        accessor: "total",
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
      },
      {
        Header: "Data da Compra",
        accessor: "created_at",
      },
      {
        Header: "Atualizada em",
        accessor: "updated_at",
      },
    ],
  },
];

export default columns;
