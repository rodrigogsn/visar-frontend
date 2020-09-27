import React from "react";
import { Image } from "../Elements";

import logo from "../../assets/img/logo-mono.png";

const Header = ({ title, buttonText, action, loader }) => {
  return (
    <header>
      <div className="logoWrapper">
        <Image source={logo} alt="Logo Visar Emplaca" />
      </div>

      <div className="titleWrapper">
        <h1>{title}</h1>

        {action && (
          <button className="button" onClick={action}>
            {loader.loading ? loader.icon : buttonText}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
