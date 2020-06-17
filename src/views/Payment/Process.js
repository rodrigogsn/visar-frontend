import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import { Title, Paragraph, Loader } from "./../../components/Elements";
import { _process } from "./../../views/content";

import api from "./../../services/api";
import MainContext from "./../../MainContext";

const Process = () => {
  let history = useHistory();
  const location = useLocation();

  const { profile, method, setTransaction } = useContext(MainContext);

  const deleteAppointment = async () => {
    await api
      .delete(`/appointments/${location.state.appointment.id}`)
      .then((response) => {
        console.log("Agendamento cancelado");
        history.goBack();
      });
  };

  const handleCard = async () => {
    const { cc_number, cc_exp, cc_cvv } = location.state.card;

    await api.get("/session").then((response) => {
      window.PagSeguroDirectPayment.setSessionId(response.data.session_id);

      /**
       * Getting sender hash
       */
      window.PagSeguroDirectPayment.onSenderHashReady(function (response) {
        if (response.status == "error") {
          console.log(response.message);
          return false;
        }
        var hash = response.senderHash; //Hash estará disponível nesta variável.

        window.PagSeguroDirectPayment.getBrand({
          cardBin: cc_number.replace(/\s/g, "").substring(0, 6),
          success: function (response) {
            const data = cc_exp.split("/");

            console.log("brand", response.brand.name);
            console.log(data[0], `20${data[1]}`);

            window.PagSeguroDirectPayment.createCardToken({
              cardNumber: cc_number.replace(/\s/g, ""), // Número do cartão de crédito
              brand: response.brand.name, // Bandeira do cartão
              cvv: cc_cvv, // CVV do cartão
              expirationMonth: data[0], // Mês da expiração do cartão
              expirationYear: `20${data[1]}`, // Ano da expiração do cartão, é necessário os 4 dígitos.
              success: async function (response) {
                console.log(response);

                const transaction = {
                  name: profile.name,
                  email: location.state.email,
                  cpf_cnpj: profile.document,
                  area_code: profile.area_code,
                  phone: profile.phone,
                  birth_date: profile.birthdate,
                  street: profile.address,
                  number: profile.address_number,
                  district: profile.district,
                  city: profile.city,
                  state: profile.uf,
                  postal_code: profile.zipcode,
                  method: method.pagseguro,
                  value: location.state.appointment.total,
                  credit_card_token: response.card.token,
                  hash: hash,
                };

                await api
                  .post("/transaction", transaction)
                  .then(async (response) => {
                    console.log(response.data);

                    setTransaction(response.data.code);

                    /**
                     * Inserting the transaction code inside this appointment
                     */
                    await api
                      .put(`/appointments/${location.state.appointment.id}`, {
                        transaction: response.data.code,
                      })
                      .then((response) => {
                        return history.push("/sucesso");
                      });
                  })
                  .catch((error) => {
                    console.log(error.response);

                    alert(
                      "Ocorreu um erro durante a transação. Verifique os dados e tente novamente."
                    );

                    deleteAppointment();
                  });
              },
              error: async function (response) {
                console.log("error", response);

                alert(
                  `Ocorreu um erro no processamento. Verifique os dados e tente novamente. (${JSON.stringify(
                    response.errors
                  )})`
                );

                deleteAppointment();
              },
              complete: function (response) {
                console.log("complete", response);
              },
            });
          },
          error: async function (response) {
            console.log("error", response);

            alert(
              `Ocorreu um erro no processamento. Verifique os dados e tente novamente. (${JSON.stringify(
                response.errors
              )})`
            );

            deleteAppointment();
          },
          complete: function (response) {
            console.log("complete", response);
          },
        });
      });
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (profile) {
      handleCard();
    } else {
      history.push("/");
    }
  }, []);

  useEffect(() => {
    console.log(location.state.appointment);
    // console.log(location.state.email);
    // console.log(location.state.card);
  }, [location]);

  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={_process.title} />
          <Paragraph text={_process.paragraph} />
          <Loader />
        </header>
      </main>

      <Footer />
    </>
  );
};

export default Process;
