import React from "react";
import Table from "./../../components/Admin/Table";

const Users = ({ columns, users }) => {
  return (
    <>
      {users.length !== 0 ? (
        <Table columns={columns} data={users} />
      ) : (
        <span className="empty">Nenhum usuário foi encontrado</span>
      )}
    </>
  );
};

export default Users;
