import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import {
  Title,
  ButtonPrimary,
  TextInput,
  MiniLink,
  Loader,
} from "./../components/Elements";
import { _login } from "./../views/content";

import api from "./../services/api";
import {
  login,
  isAuthenticated,
  isProfileSet,
  profile,
} from "./../services/auth";
import MainContext from "./../MainContext";

const Login = () => {
  let history = useHistory();

  const { setUser, profile: contextProfile, setProfile } = useContext(
    MainContext
  );

  const [buttonText, setButtonText] = useState("Entrar");

  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });

  const handleProfile = async () => {
    await api
      .get("/profiles")
      .then((response) => {
        setProfile(response.data[0]);
        profile(JSON.stringify(response.data[0]));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setButtonText(<Loader />);

    await api
      .post("/authenticate", auth)
      .then((response) => {
        console.log(response.data);

        const { profile, confirmed, email } = response.data.data;

        setUser(response.data);

        login(response.data.token, JSON.stringify(response.data.data));

        setButtonText("Entrar");

        if (!confirmed) {
          history.push("/reconfirm", { email });
        } else if (!profile) {
          history.push("/perfil");
        } else {
          handleProfile();
        }
      })
      .catch((error) => {
        console.log(error.response);

        if (error.response.data.error) {
          alert("Login inválido.");
        } else {
          alert(error.response.data[0].message);
        }
        setButtonText("Entrar");
      });
  };

  const handleInputChange = (e) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isAuthenticated() && isProfileSet()) {
      handleProfile();
    }

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    console.log(contextProfile);

    if (contextProfile) {
      history.push("/tipo");
    }
  }, [contextProfile]);

  return (
    <>
      <Header />

      <main className="default">
        <header style={{ marginBottom: 35 }}>
          <Title text={_login.title} />
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

          <div className="buttonGroup">
            <MiniLink text="Esqueci a senha" link="/forget" />
            <MiniLink text="Não tenho cadastro" link="/cadastro" />
          </div>
        </form>
      </main>

      <Footer />
    </>
  );
};

export default Login;
