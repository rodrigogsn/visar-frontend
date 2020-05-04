import React, { useEffect } from "react";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import {
  Title,
  Paragraph,
  ButtonPrimary,
  TextInput,
  MiniLink,
} from "./../../components/Elements";
import { _cadastro } from "./../../views/content";

const Cadastro = () => {
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

        <form>
          <TextInput
            label="Email"
            type="email"
            placeholder="Digite um email válido"
          />
          <TextInput
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
          />

          <ButtonPrimary text="Cadastrar" link="/confirmacao" />

          <MiniLink text="Ou fazer Login" link="/login" />
        </form>
      </main>

      <Footer />
    </>
  );
};

export default Cadastro;
