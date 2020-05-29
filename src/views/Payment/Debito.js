import React, { useContext, useEffect } from "react";
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
import { _eft } from "./../../views/content";

import MainContext from "./../../MainContext";

const Sucesso = () => {
  let history = useHistory();

  const { profile, eft } = useContext(MainContext);

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
          <Title text={_eft.title} />

          <Subtitle text={_eft.subtitle} />

          {/* <Code text={eft.code} /> */}
        </header>

        <section>
          <Paragraph text={_eft.paragraph} />

          <a href={eft.link} target="_blank" rel="noopener noreferrer">
            <ButtonPrimary text="Acessar Online Banking" />
          </a>

          <Warning text={_eft.legal} />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Sucesso;
