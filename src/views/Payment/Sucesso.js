import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import {
  Title,
  Paragraph,
  Warning,
  Subtitle,
  Code,
} from "./../../components/Elements";
import { _sucesso } from "./../../views/content";

import MainContext from "./../../MainContext";

const Sucesso = () => {
  let history = useHistory();

  const { setProfile, transaction } = useContext(MainContext);

  useEffect(() => {
    window.scrollTo(0, 0);

    setProfile("");

    // if (!transaction) {
    //   history.push("/");
    // }
  }, []);

  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={_sucesso.title} />

          <Subtitle text={_sucesso.subtitle} />

          <Code text={transaction} />
        </header>

        <section>
          <Paragraph text={_sucesso.paragraph} />

          <Warning text={_sucesso.legal} />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Sucesso;
