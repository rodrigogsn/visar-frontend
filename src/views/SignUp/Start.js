import React, { useEffect } from "react";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import {
  Title,
  Paragraph,
  ButtonPrimary,
  ButtonSecondary,
} from "./../../components/Elements";
import { _start } from "./../../views/content";

const Start = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={_start.title} />
          <Paragraph text={_start.paragraph} />
        </header>

        <div className="buttonGroup">
          <ButtonPrimary text="Cadastrar" link="/cadastro" />
          <ButtonSecondary text="Fazer Login" link="/login" />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Start;
