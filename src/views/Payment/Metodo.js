import React from "react";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import {
  Title,
  Paragraph,
  ButtonPrimary,
  ButtonSecondary,
} from "./../../components/Elements";
import { _metodo } from "./../../views/content";

const Metodo = () => {
  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={_metodo.title} />
          <Paragraph text={_metodo.paragraph} />
        </header>

        <div className="buttonGroup">
          <ButtonPrimary text="Reenviar confirmação" link="/cadastro" />
          <ButtonSecondary text="Cadastrar" link="/cadastro" />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Metodo;
