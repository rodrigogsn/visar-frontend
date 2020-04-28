import React from "react";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import {
  Title,
  Paragraph,
  ButtonPrimary,
  ButtonSecondary,
} from "./../../components/Elements";
import { _confirmacao } from "./../../views/content";

const Confirmacao = () => {
  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={_confirmacao.title} />
          <Paragraph text={_confirmacao.paragraph} />
        </header>

        <div className="buttonGroup">
          <ButtonPrimary text="Reenviar confirmação" link="/" />
          <ButtonSecondary text="Cadastrar novamente" link="/cadastro" />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Confirmacao;
