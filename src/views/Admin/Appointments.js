import React from "react";
import Table from "./../../components/Admin/Table";

const Appointments = ({ columns, all, today, tomorrow }) => {
  return (
    <>
      <h2>Hoje</h2>

      {today.length !== 0 ? (
        <Table columns={columns} data={today} />
      ) : (
        <span className="empty">Sem agendamentos ainda.</span>
      )}

      <h2>Próximo dia útil</h2>

      {tomorrow.length !== 0 ? (
        <Table columns={columns} data={tomorrow} />
      ) : (
        <span className="empty">Sem agendamentos ainda.</span>
      )}

      <h2>Todos</h2>

      <Table columns={columns} data={all} />
    </>
  );
};

export default Appointments;
