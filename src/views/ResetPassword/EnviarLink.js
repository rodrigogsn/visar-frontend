import React, { useState, useEffect } from "react";
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
import { _redefinir } from "./../../views/content";

import api from "./../../services/api";

const EnviarLink = () => {
  let history = useHistory();

  const [auth, setAuth] = useState({ email: "" });
  const [buttonText, setButtonText] = useState("Enviar link");

  /**
   *
   * Alterando valores do input
   *
   * @param {*} e
   *
   */
  const handleInputChange = (e) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
  };

  /**
   *
   * Enviar link de redefinição de senha
   *
   */
  const handleResetMail = async (e) => {
    e.preventDefault();

    setButtonText(<Loader />);

    const data = {
      email: auth.email,
      redirect_url: `${process.env.REACT_APP_REDIRECT_URL}/reset`,
    };

    await api
      .post("/passwords", data)
      .then(() => {
        setButtonText("Enviar link");

        alert(
          `O link para redefinir sua senha foi enviado para o email ${auth.email}!`
        );

        history.push("/");
      })
      .catch((error) => {
        setButtonText("Enviar link");

        alert(error.response.data.error.message);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      <main className="default">
        <header style={{ marginBottom: 35 }}>
          <Title text={_redefinir.title} />
          <Paragraph text={_redefinir.paragraph} />
        </header>

        <form onSubmit={handleResetMail}>
          <TextInput
            label="Email"
            type="email"
            name="email"
            required={true}
            placeholder="Digite o seu email"
            value={auth.email}
            onChange={handleInputChange}
          />

          <ButtonPrimary text={buttonText} type="submit" />

          <div className="buttonGroup">
            <MiniLink text="Voltar para login" link="/login" />
          </div>
        </form>
      </main>

      <Footer />
    </>
  );
};

export default EnviarLink;
