import React from "react";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import {
  Title,
  ButtonPrimary,
  TextInput,
  MiniLink,
} from "./../components/Elements";
import { _login } from "./../views/content";

const Login = () => {
  return (
    <>
      <Header />

      <main className="default">
        <header style={{ marginBottom: 35 }}>
          <Title text={_login.title} />
        </header>

        <form>
          <TextInput
            label="Email"
            type="email"
            placeholder="Digite o seu email"
          />
          <TextInput
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
          />

          <ButtonPrimary text="Entrar" link="/perfil" />

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
