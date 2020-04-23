import React from "react";
import { Link } from "react-router-dom";
import logo from "./../assets/img/logo.png";

const Header = () => {
  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="Logotipo Visar Emplaca" />
      </Link>
      <ul>
        <li>
          <Link to="/contato">Contato</Link>
        </li>
        <li>
          <Link to="/localizacao">Localização</Link>
        </li>
        <li>
          <Link to="/login">
            <button>Agendar Emplacamento</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
