import React from "react";
import { Link } from "react-router-dom";
import { estados } from "./../views/content/estados";
import { Squares } from "react-activity";
import "react-activity/dist/react-activity.css";

import api from "./../services/api";
import MainContext from "./../MainContext";
// import * as cep from "cep-promise";

export const Loader = () => (
  <Squares color="black" size={36} speed={1} animating={true} />
);

export const ButtonPrimary = ({ text, link, press }) => {
  if (link) {
    return (
      <Link to={link}>
        <button onClick={press}>{text}</button>
      </Link>
    );
  } else {
    return <button onClick={press}>{text}</button>;
  }
};
export const ButtonSecondary = ({ text, link, press }) => {
  if (link) {
    return (
      <Link to={link}>
        <button onClick={press} className="secondary">
          {text}
        </button>
      </Link>
    );
  } else {
    return (
      <button onClick={press} className="secondary">
        {text}
      </button>
    );
  }
};

export const ButtonSuccess = ({ text, link, press }) => {
  if (link) {
    return (
      <Link to={link}>
        <button onClick={press} className="success">
          {text}
        </button>
      </Link>
    );
  } else {
    return (
      <button onClick={press} className="success">
        {text}
      </button>
    );
  }
};

export const ButtonDisabled = ({ text, link }) => (
  <Link to={link}>
    <button className="disabled" disabled>
      {text}
    </button>
  </Link>
);

export const TextInput = ({
  type,
  label,
  name,
  placeholder,
  state,
  onChange,
}) => (
  <div>
    <label>{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={state}
      onChange={onChange}
      onFocus={(e) => (e.target.originalvalue = e.target.value)}
    ></input>
  </div>
);

export const TextInputDisabled = ({ type, label, placeholder }) => (
  <div>
    <label>{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      disabled
      className="disabled"
    ></input>
  </div>
);

export const DropListUF = ({ name, label, placeholder, onChange }) => {
  const estadosSort = estados.sort((a, b) => (a.sigla > b.sigla ? 1 : -1));

  const options = estadosSort.map((estado) => (
    <option value={estado.sigla}>{estado.sigla}</option>
  ));

  return (
    <div>
      <label>{label}</label>
      <select
        id={name}
        name={name}
        onChange={onChange}
        onFocus={(e) => (e.target.originalvalue = e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options}
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
