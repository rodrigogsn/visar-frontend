import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import {
  Title,
  Paragraph,
  ButtonPrimary,
  ButtonSecondary,
  Loader,
} from "./../../components/Elements";

import api from "./../../services/api";

const Confirm = () => {
  const location = useLocation();

  const [title, setTitle] = useState(<Title text="Verificando" />);
  const [paragraph, setParagraph] = useState(<Loader />);
  const [button, setButton] = useState("");
  const [link, setLink] = useState("");

  const handleConfirm = async () => {
    const { token } = queryString.parse(location.search);

    await api
      .put("/confirm", { token })
      .then(() => {
        setTitle(<Title text="Email confirmado ✅" />);
        setParagraph(
          <Paragraph text="Você já pode continuar seu cadastro agora!" />
        );
        setButton(<ButtonPrimary text="Login" link="/login" />);
      })
      .catch((error) => {
        console.log(error.response.data[0].message);
        let msg = `Mensagem do sistema: ${error.response.data[0].message} Tente fazer login para confirmar o cadastro.`;

        setTitle(<Title text="Ocorreu um erro ao confirmar" />);
        setParagraph(<Paragraph text={msg} />);
        setButton(<ButtonSecondary text="Entrar" link="/login" />);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    handleConfirm();
  }, []);

  return (
    <>
      <Header />

      <main className="default">
        <header>
          {title}
          {paragraph}
        </header>

        <div className="buttonGroup">
          {button}
          {link}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Confirm;
