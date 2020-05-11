import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import { Title, Paragraph, ButtonSuccess } from "./../../components/Elements";
import { _agendamento } from "./../../views/content";

import api from "./../../services/api";
import MainContext from "./../../MainContext";

const Agendamento = () => {
  let history = useHistory();

  const { profile, subcategory, setSpot } = useContext(MainContext);

  const [data, setData] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={_agendamento.title} />
          <Paragraph text={_agendamento.paragraph} />
        </header>

        <form>
          <ButtonSuccess text="Pagar ($200)" />
        </form>
      </main>

      <Footer />
    </>
  );
};

export default Agendamento;
