import React from "react";

import logo from "./../assets/img/logo.png";

const Maintenance = () => {
  return (
    <>
      <main
        className="default"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <img
          src={logo}
          alt="Logotipo Visar Emplaca"
          title="Logotipo Visar Emplaca"
          style={{ maxWidth: 600 }}
        />
        <br />
        <h1>Em manutenção, voltamos logo!</h1>
        <br />
        <p>Previsão de retorno: às 14:00h</p>
      </main>
    </>
  );
};

export default Maintenance;
