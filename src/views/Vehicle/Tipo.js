import React, { useEffect } from "react";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import { Title, Paragraph, ButtonPrimary } from "./../../components/Elements";
import { _tipo } from "./../../views/content";

const Tipo = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={_tipo.title} />
          <Paragraph text={_tipo.paragraph} />
        </header>

        <form>
          <ButtonPrimary text="Cadastrar" link="/cadastro" />
        </form>
      </main>

      <Footer />
    </>
  );
};

export default Tipo;
