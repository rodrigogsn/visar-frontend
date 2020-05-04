import React, { useEffect } from "react";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import { Title, Paragraph, ButtonPrimary } from "./../../components/Elements";
import { _subtipo } from "./../../views/content";

const Subtipo = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={_subtipo.title} />
          <Paragraph text={_subtipo.paragraph} />
        </header>

        <form>
          <ButtonPrimary text="Cadastrar" link="/cadastro" />
        </form>
      </main>

      <Footer />
    </>
  );
};

export default Subtipo;
