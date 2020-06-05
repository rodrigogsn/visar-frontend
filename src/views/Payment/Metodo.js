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

  const { profile, setMethod, subtotal, setSubtotal } = useContext(MainContext);

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
    const method = methods.filter((item) => item.id == key);

    setMethod(method[0]);

    setSubtotal({
      ...subtotal,
      method: method[0].increase - method[0].discount,
    });

    if (method[0].pagseguro === "boleto") {
      history.push("/agendamento-boleto");
    } else if (method[0].pagseguro === "eft") {
      history.push("/agendamento-debito");
    } else {
      history.push("/agendamento-card");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    handleMethods();

    handleDates();
  }, []);

  const handleDates = () => {
    const date1 = new Date();
    date1.setDate(date1.getDate() + 1);
    const currentDate = new Intl.DateTimeFormat("pt-BR").format(date1);

    const date2 = new Date();
    date2.setDate(date2.getDate() + 10);
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
          <span className="buttonWide-container">
            <div
              className="buttonWide"
              style={{ flex: "initial", minHeight: "auto" }}
              onClick={() => saveMethod(1)}
            >
              <SvgCredito className="buttonWide-image" alt="" />
              <h2>Cartão de Crédito</h2>
              <p>
                Agende uma data a partir de <strong>{handleDates()[0]}</strong>.
              </p>
            </div>
            <div className="buttonWide-detail"></div>
          </span>

          <span className="buttonWide-container">
            <div
              className="buttonWide"
              style={{ flex: "initial", minHeight: "auto" }}
              onClick={() => saveMethod(2)}
            >
              <SvgDebito className="buttonWide-image" alt="" />
              <h2>Online Banking</h2>
              <p>
                Agende uma data a partir de <strong>{handleDates()[0]}</strong>.
              </p>
            </div>
            <div className="buttonWide-detail">
              <p>
                <strong>Disponível para:</strong> Itaú, Bradesco, Banco do
                Brasil e Banrisul.
              </p>
            </div>
          </span>

          <span className="buttonWide-container">
            <div
              className="buttonWide"
              style={{ flex: "initial", minHeight: "auto" }}
              onClick={() => saveMethod(3)}
            >
              <SvgBoleto className="buttonWide-image" alt="" />
              <h2>Boleto</h2>
              <p>
                Agende uma data a partir de <strong>{handleDates()[1]}</strong>.
              </p>
            </div>
            <div className="buttonWide-detail"></div>
          </span>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Metodo;
