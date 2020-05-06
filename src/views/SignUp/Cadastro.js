import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import {
  Title,
  Paragraph,
  ButtonPrimary,
  TextInput,
  MiniLink,
  Loader,
} from "./../../components/Elements";
import { _cadastro } from "./../../views/content";

import api from "./../../services/api";

const Cadastro = () => {
  let history = useHistory();

  const [buttonText, setButtonText] = useState("Cadastrar");

  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });

  const handleSignUp = async (e) => {
    e.preventDefault();

    setButtonText(<Loader />);

    await api
      .post("/register", auth)
      .then((response) => {
        console.log(response.data);
        setButtonText("Cadastrar");
        history.push("/confirmacao");
      })
      .catch((error) => {
        console.log(error.response);
        setButtonText("Cadastrar");
        alert("Ocorreu um erro! Revise os dados e tente novamente.");
      });
  };

  const handleInputChange = (e) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={_cadastro.title} />
          <Paragraph text={_cadastro.paragraph} />
        </header>

        <form onSubmit={handleSignUp}>
          <TextInput
            label="Email"
            type="email"
            name="email"
            placeholder="Digite um email válido"
            value={auth.email}
            onChange={handleInputChange}
          />
          <TextInput
            label="Senha"
            type="password"
            name="password"
            placeholder="Digite sua senha"
            value={auth.email}
            onChange={handleInputChange}
          />

          <ButtonPrimary text={buttonText} type="submit" />

          <MiniLink text="Ou fazer Login" link="/login" />
        </form>
      </main>

      <Footer />
    </>
  );
};

export default Cadastro;
