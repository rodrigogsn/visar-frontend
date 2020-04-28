import React from "react";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import { Title, Paragraph, ButtonPrimary } from "./../../components/Elements";
import { _agendamento } from "./../../views/content";

const Agendamento = () => {
  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={_agendamento.title} />
          <Paragraph text={_agendamento.paragraph} />
        </header>

        <form>
          <ButtonPrimary text="Cadastrar" link="/cadastro" />
        </form>
      </main>

      <Footer />
    </>
  );
};

export default Agendamento;
