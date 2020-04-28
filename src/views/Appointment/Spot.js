import React from "react";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import { Title, Paragraph, ButtonPrimary } from "./../../components/Elements";
import { _spot } from "./../../views/content";

const Spot = () => {
  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={_spot.title} />
          <Paragraph text={_spot.paragraph} />
        </header>

        <form>
          <ButtonPrimary text="Cadastrar" link="/cadastro" />
        </form>
      </main>

      <Footer />
    </>
  );
};

export default Spot;
