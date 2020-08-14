import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Toast from "./Toast";
import logo from "./../assets/img/logo.png";

import MainContext from "./../MainContext";
import { isAuthenticated, logout } from "./../services/auth";

const Header = () => {
  let history = useHistory();

  const [logged, setLogged] = useState(false);

  const { setUser, setProfile } = useContext(MainContext);

  const handleLogout = () => {
    setUser("");
    setProfile("");
    logout();

    history.push("/");
  };

  useEffect(() => {
    if (isAuthenticated()) {
      setLogged(true);
    }
  }, [logged]);

  return (
    <>
      <Toast />

      {process.env.REACT_APP_NODE_ENV === "development" && (
        <div className="devbar">Ambiente de Desenvolvimento</div>
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
