import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
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
import MainContext from "./../../MainContext";
import { logout } from "./../../services/auth";

const Reset = () => {
  let history = useHistory();
  const location = useLocation();

  const { setUser, setProfile } = useContext(MainContext);

  const [auth, setAuth] = useState({ password: "" });
  const [buttonText, setButtonText] = useState("Atualizar senha");

  /**
   *
   * Alterar valores do input
   *
   * @param {*} e
   *
   */
  const handleInputChange = (e) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
  };

  /**
   *
   * Atualizar (resetar) senha
   *
   * @param {*} e
   *
   */
  const handleReset = async (e) => {
    e.preventDefault();

    const { token } = queryString.parse(location.search);

    setButtonText(<Loader />);

    const data = {
      token,
      password: auth.password,
    };

    await api
      .put("/passwords", data)
      .then(() => {
        setButtonText("Redefinir senha");

        setUser("");
        setProfile("");
        logout();

        alert(
          `Sua senha foi atualizada! Faça seu login novamente em nosso site.`
        );

        history.push("/login");
      })
      .catch((error) => {
        setButtonText("Redefinir senha");

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

        <form onSubmit={handleReset}>
          <TextInput
            label="Senha"
            type="password"
            name="password"
            required={true}
            placeholder="Digite sua nova senha"
            value={auth.password}
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

export default Reset;
