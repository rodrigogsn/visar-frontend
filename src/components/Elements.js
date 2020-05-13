import React from "react";
import { Link } from "react-router-dom";
import { estados } from "./../views/content/estados";
import { meses } from "./../views/content/meses";
import { horarios } from "./../views/content/horarios";
import { Squares } from "react-activity";
import "react-activity/dist/react-activity.css";

import InputMask from "react-input-mask";

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
  style,
  placeholder,
  state,
  onChange,
  onBlur,
  required,
  mask,
  alwaysShowMask,
  onKeyDown,
  onKeyUp,
}) => {
  return (
    <div>
      <label className={style}>{label}</label>
      <InputMask
        type={type}
        name={name}
        placeholder={placeholder}
        value={state}
        onChange={onChange}
        required={required}
        mask={mask}
        alwaysShowMask={alwaysShowMask}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        className={style}
        onFocus={(e) => (e.target.originalvalue = e.target.value)}
      ></InputMask>
    </div>
  );
};

export const TextInputDisabled = ({ type, label, placeholder, state }) => (
  <div>
    <label>{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      disabled
      value={state}
      className="disabled"
    ></input>
  </div>
);

export const DropListUF = ({
  name,
  label,
  state,
  placeholder,
  onChange,
  required,
}) => {
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
        value={state}
        required={required}
        onChange={onChange}
        onFocus={(e) => (e.target.originalvalue = e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options}
      </select>
    </div>
  );
};

export const DropListMonth = ({
  name,
  label,
  state,
  style,
  placeholder,
  onChange,
  required,
}) => {
  const options = meses.map((mes) => (
    <option value={mes.value}>{mes.name}</option>
  ));

  return (
    <div>
      <label>{label}</label>
      <select
        id={name}
        name={name}
        value={state}
        required={required}
        onChange={onChange}
        className={style}
        onFocus={(e) => (e.target.originalvalue = e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options}
      </select>
    </div>
  );
};

export const DropListDay = ({
  name,
  label,
  month,
  style,
  year,
  state,
  blockedWeeekdays,
  placeholder,
  onChange,
  required,
}) => {
  /**
   * @param {int} The month number, 0 based
   * @param {int} The year, not zero based, required to account for leap years
   * @return {Date[]} List with date objects for each day of the month
   */
  const getDaysInMonth = (month, year) => {
    let date = new Date(year, month, 1);
    let days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    const result = days
      .filter((item) => {
        const w = item
          .toLocaleDateString("pt-BR", { weekday: "short" })
          .substring(0, 3);

        return w !== blockedWeeekdays[0];
      })
      .map((item) => {
        const d = item.toLocaleDateString("pt-BR");
        const w = item
          .toLocaleDateString("pt-BR", { weekday: "short" })
          .substring(0, 3);

        return { d, w };
      });

    return result;
  };

  const options = getDaysInMonth(parseInt(month), year).map((dia) => (
    <option value={dia.d}>
      {dia.d} ({dia.w})
    </option>
  ));

  return (
    <div>
      <label>{label}</label>
      <select
        id={name}
        name={name}
        value={state}
        required={required}
        onChange={onChange}
        className={style}
        onFocus={(e) => (e.target.originalvalue = e.target.value)}
      >
        {options}
      </select>
    </div>
  );
};

export const DropListTime = ({
  name,
  label,
  state,
  style,
  placeholder,
  onChange,
  required,
}) => {
  const options = horarios.map((horario) => (
    <option value={horario.value}>{horario.value}</option>
  ));

  return (
    <div>
      <label>{label}</label>
      <select
        id={name}
        name={name}
        value={state}
        required={required}
        onChange={onChange}
        onFocus={(e) => (e.target.originalvalue = e.target.value)}
        className={style}
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
