import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import { Title, Paragraph, ButtonPrimary } from "./../../components/Elements";
import { _sucesso } from "./../../views/content";

import MainContext from "./../../MainContext";

const Sucesso = () => {
  let history = useHistory();

  const { profile } = useContext(MainContext);

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
          <Title text={_sucesso.title} />
          <Paragraph text={_sucesso.subtitle} />
        </header>
      </main>

      <Footer />
    </>
  );
};

export default Sucesso;
