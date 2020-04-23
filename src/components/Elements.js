import React from "react";
import { Link } from "react-router-dom";

export const ButtonPrimary = ({ text, link }) => (
  <Link to={link}>
    <button>{text}</button>
  </Link>
);

export const Title = ({ text }) => <h1>{text}</h1>;

export const Paragraph = ({ text }) => <p>{text}</p>;

export const Image = ({ source, alt, title }) => (
  <img src={source} alt={alt} title={title} />
);

export default ButtonPrimary;
