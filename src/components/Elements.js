import React from "react";
import { Link } from "react-router-dom";
import { estados } from "./../views/content/estados";
// import * as cep from "cep-promise";

export const ButtonPrimary = ({ text, link }) => (
  <Link to={link}>
    <button>{text}</button>
  </Link>
);

export const ButtonSecondary = ({ text, link }) => (
  <Link to={link}>
    <button class="secondary">{text}</button>
  </Link>
);

export const ButtonSuccess = ({ text, link }) => (
  <Link to={link}>
    <button class="success">{text}</button>
  </Link>
);

export const ButtonDisabled = ({ text, link }) => (
  <Link to={link}>
    <button class="disabled" disabled>
      {text}
    </button>
  </Link>
);

export const TextInput = ({ type, label, placeholder }) => (
  <div>
    <label>{label}</label>
    <input type={type} placeholder={placeholder}></input>
  </div>
);

export const TextInputDisabled = ({ type, label, placeholder }) => (
  <div>
    <label>{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      disabled
      class="disabled"
    ></input>
  </div>
);

export const DropList = ({ name, label, placeholder }) => {
  const estadosSort = estados.sort((a, b) => (a.sigla > b.sigla ? 1 : -1));

  const uf = estadosSort.map((estado) => (
    <option value={estado.sigla}>{estado.sigla}</option>
  ));

  return (
    <div>
      <label>{label}</label>
      <select id={name}>
        <option value="">{placeholder}</option>
        {uf}
      </select>
    </div>
  );
};

export const MiniLink = ({ text, link }) => (
  <Link to={link} className="miniLink">
    {text}
  </Link>
);

export const Title = ({ text }) => <h1>{text}</h1>;

export const Paragraph = ({ text }) => <p>{text}</p>;

export const Image = ({ source, alt, title }) => (
  <img src={source} alt={alt} title={title} />
);

export default ButtonPrimary;
