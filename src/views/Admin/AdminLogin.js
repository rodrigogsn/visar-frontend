import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Title,
  ButtonPrimary,
  TextInput,
  Loader,
} from "./../../components/Elements";
import { _admin } from "./../../views/content";
import { login } from "./../../services/auth";
import logo from "./../../assets/img/logo.png";

import api from "./../../services/api";

const AdminLogin = () => {
  const history = useHistory();

  const [buttonText, setButtonText] = useState("Entrar");

  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    setButtonText(<Loader />);

    await api
      .post("/admin_authenticate", auth)
      .then((response) => {
        setButtonText("Entrar");

        login(response.data.token, JSON.stringify(response.data.data));

        history.push("/dashboard");
      })
      .catch((error) => {
        setButtonText("Entrar");

        alert(error.response.data.message);
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
      <main className="default">
        <header style={{ marginBottom: 35 }}>
          <img src={logo} alt="Logo Visar Emplaca" className="logo-admin" />
          <Title text={_admin.title} />
        </header>

        <form onSubmit={handleLogin}>
          <TextInput
            label="Email"
            type="email"
            name="email"
            required={true}
            placeholder="Digite o seu email"
            value={auth.email}
            onChange={handleInputChange}
          />
          <TextInput
            label="Senha"
            type="password"
            name="password"
            required={true}
            placeholder="Digite sua senha"
            value={auth.password}
            onChange={handleInputChange}
          />

          <ButtonPrimary text={buttonText} type="submit" />
        </form>
      </main>
    </>
  );
};

export default AdminLogin;
