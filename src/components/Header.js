import React from "react";
import { Link } from "react-router-dom";
import logo from "./../assets/img/logo.png";

const Header = () => {
  return (
    <>
      {process.env.REACT_APP_NODE_ENV === "development" && (
        <div className="toast">
          <p>
            <strong>Ambiente de desenvolvimento:</strong> As transações feitas
            neste site não são oficiais e os agendamentos são feitos para fins
            de testes apenas. Para acessar o site em produção use o link{" "}
            <a href="https://visaremplaca.com.br">
              https://visaremplaca.com.br
            </a>
          </p>
        </div>
      )}
      <nav>
        <Link to="/">
          <img src={logo} alt="Logotipo Visar Emplaca" />
        </Link>
        <ul>
          {/* <li>
          <Link to="/start">Contato</Link>
        </li> */}
          {/* <li>
          <Link to="/start">Localização</Link>
        </li> */}
          <li>
            <Link to="/start">
              <button>Agendar Emplacamento</button>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
