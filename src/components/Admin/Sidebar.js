import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faCalendar } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <aside className="dashboard">
      <div>
        <ul>
          <li>
            <span role="link" tabIndex={0}>
              <FontAwesomeIcon
                icon={faCalendar}
                style={{ fontSize: 16, marginRight: 5 }}
              />
              Agendamentos
            </span>
          </li>
          <li>
            <span role="link" tabIndex={0}>
              <FontAwesomeIcon
                icon={faUserCircle}
                style={{ fontSize: 16, marginRight: 5 }}
              />
              Usuários
            </span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
