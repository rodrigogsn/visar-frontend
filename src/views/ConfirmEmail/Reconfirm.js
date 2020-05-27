import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import {
  Title,
  Paragraph,
  MiniLink,
  ButtonSecondary,
  Loader,
} from "./../../components/Elements";
import { _reconfirm } from "./../content/index";

import api from "./../../services/api";
import MainContext from "./../../MainContext";

const Reconfirm = () => {
  let history = useHistory();

  const location = useLocation();

  const [buttonText, setButtonText] = useState("Reenviar Confirmação");

  const handleReconfirm = async () => {
    setButtonText(<Loader />);

    const data = {
      email: location.state.email,
      redirect_url: process.env.REACT_APP_REDIRECT_URL,
    };

    await api
      .post("/confirm", data)
      .then(() => {
        setButtonText("Cadastrar");

        alert(
          `Email reenviado para ${location.state.email}! Favor confirmar para continuar o cadastro.`
        );

        history.push("/");
      })
      .catch((error) => {
        setButtonText("Cadastrar");

        console.log(error.response);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!location.state.email) {
      history.push("/");
    }
  }, []);

  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={_reconfirm.title} />
          <Paragraph text={_reconfirm.paragraph} />
        </header>

        <ButtonSecondary text={buttonText} press={() => handleReconfirm()} />
        <MiniLink text="Fazer login" link="/login" />
      </main>

      <Footer />
    </>
  );
};

export default Reconfirm;
