import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import { Title, Paragraph } from "./../../components/Elements";
import { _metodo } from "./../../views/content";

import MainContext from "./../../MainContext";

import { ReactComponent as SvgCredito } from "./../../assets/img/credit-card-option.svg";
import { ReactComponent as SvgDebito } from "./../../assets/img/debit-card-option.svg";
import { ReactComponent as SvgBoleto } from "./../../assets/img/boleto-option.svg";

const Metodo = () => {
  const { profile } = useContext(MainContext);

  useEffect(() => {
    handleDates();
    window.scrollTo(0, 0);
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
          <p className="customParagraph">
            Olá <strong>{profile.name}</strong>!
          </p>
          <Paragraph text={_metodo.paragraph} />
        </header>

        <div className="buttonGroup">
          <Link to="/">
            <div className="buttonWide">
              <SvgCredito className="buttonWide-image" alt="" />
              <h2>Cartão de Crédito</h2>
              <p>
                Agende uma data a partir de <strong>{handleDates()[0]}</strong>.
              </p>
            </div>
          </Link>

          <Link to="/">
            <div className="buttonWide">
              <SvgDebito className="buttonWide-image" alt="" />
              <h2>Cartão de Débito</h2>
              <p>
                Agende uma data a partir de <strong>{handleDates()[0]}</strong>.
              </p>
            </div>
          </Link>

          <Link to="/">
            <div className="buttonWide">
              <SvgBoleto className="buttonWide-image" alt="" />
              <h2>Boleto</h2>
              <p>
                Agende uma data a partir de <strong>{handleDates()[1]}</strong>.
              </p>
            </div>
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Metodo;
