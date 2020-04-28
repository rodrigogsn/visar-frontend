import React from "react";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import { Title, Paragraph, ButtonPrimary } from "./../../components/Elements";
import { _sucesso } from "./../../views/content";

const Sucesso = () => {
  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={_sucesso.title} />
          <Paragraph text={_sucesso.paragraph} />
        </header>

        <form>
          <ButtonPrimary text="Cadastrar" link="/cadastro" />
        </form>
      </main>

      <Footer />
    </>
  );
};

export default Sucesso;
