import React from "react";
import { Image } from "../Elements";

import logo from "../../assets/img/logo-mono.png";

const Header = ({ title, buttonAction, buttonText }) => {
  return (
    <header>
      <div className="logoWrapper">
        <Image source={logo} alt="Logo Visar Emplaca" />
      </div>

      <div className="titleWrapper">
        <h1>{title}</h1>

        {buttonAction && buttonText && (
          <button className="button" onClick={buttonAction}>
            {buttonText}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
