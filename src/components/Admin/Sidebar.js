import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faCalendar } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ menu, page, setPage }) => {
  return (
    <aside className="dashboard">
      <div>
        <ul>
          <li>
            <span role="link" tabIndex={0} onClick={() => setPage(0)}>
              <FontAwesomeIcon
                icon={faCalendar}
                style={{ fontSize: 16, marginRight: 5 }}
              />
              {menu[0].name}
            </span>
          </li>
          <li>
            <span role="link" tabIndex={0} onClick={() => setPage(1)}>
              <FontAwesomeIcon
                icon={faUserCircle}
                style={{ fontSize: 16, marginRight: 5 }}
              />
              {menu[1].name}
            </span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
