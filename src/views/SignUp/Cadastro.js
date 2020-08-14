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
import MainContext from "./../../MainContext";
import { logout } from "./../../services/auth";

const Cadastro = () => {
  let history = useHistory();

  const { setUser, setProfile } = useContext(MainContext);

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
      .then(async (response) => {
        setUser("");
        setProfile("");
        logout();

        const data = {
          email: response.data.email,
          redirect_url: `${process.env.REACT_APP_REDIRECT_URL}/confirm`,
        };

        await api
          .post("/confirm", data)
          .then(() => {
            setButtonText("Cadastrar");

            history.push("/reconfirm", { email: response.data.email });
          })
          .catch((error) => {
            alert(error.response.data.error.message);

            setButtonText("Cadastrar");
          });
      })
      .catch((error) => {
        setButtonText("Cadastrar");

        alert(error.response.data[0].message);
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
