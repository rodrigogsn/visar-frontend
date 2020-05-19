import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import {
  Title,
  Paragraph,
  ButtonSuccess,
  TextInput,
  Loader,
} from "./../../components/Elements";
import { _card } from "./../../views/content";

import api from "./../../services/api";
import MainContext from "./../../MainContext";

const Card = () => {
  let history = useHistory();

  const {
    profile,
    category,
    subcategory,
    spot,
    location,
    method,
    subtotal,
  } = useContext(MainContext);

  const total = subtotal.subcategory + subtotal.spot + subtotal.method;
  const [buttonText, setButtonText] = useState(`Gerar Boleto: R$${total}`);
  const [workTime, setWorkTime] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [blockedWeekdays, setBlockedWeekdays] = useState(["dom"]);

  const [card, setCard] = useState({
    cc_number: "",
    cc_exp: "",
    cc_cvv: "",
    cc_name: "",
  });

  const [validation, setValidation] = useState({
    cc_number: "",
    cc_exp: "",
    cc_cvv: "",
    cc_name: "",
  });

  const handleInput = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const emptyMaskValidate = (e) => {
    const index = e.target.value.indexOf("_");

    if (index !== -1) {
      setValidation({ ...validation, [e.target.name]: "inputError" });
    } else {
      setValidation({ ...validation, [e.target.name]: "" });
    }
  };

  // const handlePaySession = async () => {
  //   // await api.get("/pay_auth").then((response) => {
  //   //   window.PagSeguroDirectPayment.setSessionId(response.data.session_id);
  //   //   console.log(response.data.session_id);
  //   // });
  //   // window.PagSeguroDirectPayment.createCardToken({
  //   //   cardNumber: "4111111111111111", // Número do cartão de crédito
  //   //   brand: "visa", // Bandeira do cartão
  //   //   cvv: "013", // CVV do cartão
  //   //   expirationMonth: "12", // Mês da expiração do cartão
  //   //   expirationYear: "2026", // Ano da expiração do cartão, é necessário os 4 dígitos.
  //   //   success: function (response) {
  //   //     console.log(response);
  //   //   },
  //   //   error: function (response) {
  //   //     console.log(response);
  //   //   },
  //   //   complete: function (response) {
  //   //     console.log(response);
  //   //   },
  //   // });
  // };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={_card.title} />
          <Paragraph text={_card.paragraph} />
        </header>

        <form>
          <TextInput
            label="Número do Cartão 💳"
            name="cc_number"
            required={true}
            mask="9999 9999 9999 9999"
            onChange={handleInput}
            style={validation.cc_number}
            onBlur={(e) => emptyMaskValidate(e)}
          />

          <div className="col2">
            <TextInput
              label="Validade"
              name="cc_exp"
              required={true}
              mask="99/99"
              placeholder="MM/YY"
              onChange={handleInput}
              style={validation.cc_exp}
              onBlur={(e) => emptyMaskValidate(e)}
            />
            <TextInput
              label="CVV"
              name="cc_cvv"
              required={true}
              onChange={handleInput}
              style={validation.cc_cvv}
              onBlur={(e) => emptyMaskValidate(e)}
            />
          </div>

          <TextInput
            label="Nome do titular"
            name="cc_name"
            required={true}
            onChange={handleInput}
            style={validation.cc_name}
            onBlur={(e) => emptyMaskValidate(e)}
          />

          <ButtonSuccess text={buttonText} />
        </form>
      </main>

      <Footer />
    </>
  );
};

export default Card;
