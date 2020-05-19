import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import {
  Title,
  Paragraph,
  Subtitle,
  ButtonPrimary,
  Warning,
  Code,
} from "./../../components/Elements";
import { _boleto } from "./../../views/content";

import MainContext from "./../../MainContext";

const Sucesso = () => {
  let history = useHistory();

  const { profile, boleto } = useContext(MainContext);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!profile) {
      history.push("/");
    }
  }, []);

  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={_boleto.title} />

          <Subtitle text={_boleto.subtitle} />

          {/* <Code text={boleto.code} /> */}
        </header>

        <section>
          <Paragraph text={_boleto.paragraph} />

          <a href={boleto.link} target="_blank" rel="noopener noreferrer">
            <ButtonPrimary text="📄 Imprimir boleto" />
          </a>

          <Warning text={_boleto.legal} />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Sucesso;
