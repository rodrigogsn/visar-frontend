import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Toast from "./Toast";
import logo from "./../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import MainContext from "./../MainContext";
import { isAuthenticated, logout } from "./../services/auth";

const Header = () => {
  let history = useHistory();

  const [logged, setLogged] = useState(false);

  const { profile, setUser, setProfile } = useContext(MainContext);

  /**
   *
   * Logout
   *
   */
  const handleLogout = () => {
    setUser("");
    setProfile("");
    logout();

    history.push("/");
  };

  useEffect(() => {
    if (isAuthenticated() && profile) {
      setLogged(true);
    }
  }, [logged]);

  return (
    <>
      <Toast />

      {process.env.REACT_APP_NODE_ENV === "development" && (
        <div className="devbar">Ambiente de Desenvolvimento</div>
      )}

      {/* <div className="warningbar">
        O sistema está apresentando instabilidades.
        <br />
        Caso tenha problemas para se cadastrar entre em contato conosco pelo
        (13) 3222-5442 ou (13) 3223-9102.
      </div> */}

      <nav>
        <Link to="/">
          <img src={logo} alt="Logotipo Visar Emplaca" />
        </Link>
        <ul>
          {/* <li>
            <Link to="/start">Contato</Link>
          </li>
          <li>
            <Link to="/start">Localização</Link>
          </li> */}
          {logged && (
            <li>
              <button onClick={handleLogout} className="navButton">
                Sair{" "}
                <FontAwesomeIcon icon={faSignOutAlt} style={{ fontSize: 16 }} />
              </button>
            </li>
          )}
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
