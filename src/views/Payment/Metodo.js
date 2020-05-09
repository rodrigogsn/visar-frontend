import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import { Title, Paragraph } from "./../../components/Elements";
import { _metodo } from "./../../views/content";

import api from "./../../services/api";
import MainContext from "./../../MainContext";

import { ReactComponent as SvgCredito } from "./../../assets/img/credit-card-option.svg";
import { ReactComponent as SvgDebito } from "./../../assets/img/debit-card-option.svg";
import { ReactComponent as SvgBoleto } from "./../../assets/img/boleto-option.svg";

const Metodo = () => {
  let history = useHistory();

  const { profile, setMethod } = useContext(MainContext);

  if (!profile) {
    history.push("/");
  }

  const [methods, setMethods] = useState();

  const handleMethods = async () => {
    await api
      .get("/payment_methods")
      .then((response) => {
        console.log(response.data);
        setMethods(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const saveMethod = (key) => {
    const array = methods.map((item) => item.id);

    const selected = array.find((item) => item === key);

    setMethod(selected);

    history.push("/agendamento");
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    handleMethods();

    handleDates();
  }, []);

  const handleDates = () => {
    const date1 = new Date();
    const currentDate = new Intl.DateTimeFormat("pt-BR").format(date1);

    const date2 = new Date();
    date2.setDate(date2.getDate() + 3);
    const nextDate = new Intl.DateTimeFormat("pt-BR").format(date2);

    return [currentDate, nextDate];
  };

  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={_metodo.title} />
          <Paragraph text={_metodo.paragraph} />
        </header>

        <div className="buttonGroup">
          <div className="buttonWide" onClick={() => saveMethod(1)}>
            <SvgCredito className="buttonWide-image" alt="" />
            <h2>Cartão de Crédito</h2>
            <p>
              Agende uma data a partir de <strong>{handleDates()[0]}</strong>.
            </p>
          </div>

          <div className="buttonWide" onClick={() => saveMethod(2)}>
            <SvgDebito className="buttonWide-image" alt="" />
            <h2>Cartão de Débito</h2>
            <p>
              Agende uma data a partir de <strong>{handleDates()[0]}</strong>.
            </p>
          </div>

          <div className="buttonWide" onClick={() => saveMethod(3)}>
            <SvgBoleto className="buttonWide-image" alt="" />
            <h2>Boleto</h2>
            <p>
              Agende uma data a partir de <strong>{handleDates()[1]}</strong>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Metodo;
