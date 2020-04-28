import React from "react";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import { Title, Paragraph, ButtonPrimary } from "./../../components/Elements";
import { _card } from "./../../views/content";

const Card = () => {
  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={_card.title} />
          <Paragraph text={_card.paragraph} />
        </header>

        <form>
          <ButtonPrimary text="Cadastrar" link="/cadastro" />
        </form>
      </main>

      <Footer />
    </>
  );
};

export default Card;
