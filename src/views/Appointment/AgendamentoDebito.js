import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import {
  Title,
  Paragraph,
  ButtonPrimary,
  TextInput,
  DropListDay,
  DropListMonth,
  DropListTime,
  Loader,
} from "./../../components/Elements";
import { _agendamento } from "./../../views/content";

import bancodobrasil from "./../../assets/img/bancodobrasil.png";
import bradesco from "./../../assets/img/bradesco.png";
import itau from "./../../assets/img/itau.png";
import banrisul from "./../../assets/img/banrisul.png";

import api from "./../../services/api";
import MainContext from "./../../MainContext";

const AgendamentoDebito = () => {
  let history = useHistory();

  const {
    profile,
    category,
    subcategory,
    spot,
    location,
    address,
    method,
    subtotal,
    setEft,
  } = useContext(MainContext);

  const total = subtotal.subcategory + subtotal.spot + subtotal.method;

  const [storage, setStorage] = useState("");
  const [buttonText, setButtonText] = useState(`Continuar: R$${total}`);
  const [workTime, setWorkTime] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [blockedWeekdays, setBlockedWeekdays] = useState(["dom", "sáb"]);
  const [vehicle, setVehicle] = useState({
    plate: "",
    brand: "",
    model: "",
    year: "",
    detran: "",
    renavam: "",
  });
  const [bank, setBank] = useState(null);
  const [date, setDate] = useState({
    day: "",
    month: "",
    year: "",
    time: "",
    currentMonth: "",
    currentDay: "",
    currentYear: "",
  });
  const [daysByMonth, setDaysByMonth] = useState([]);

  const deleteAppointment = async (appointment_id) => {
    await api.delete(`/appointments/${appointment_id}`).then((response) => {
      history.goBack();
    });
  };

  const handleWorkTime = async () => {
    await api.get("/work_times").then((response) => {
      let data = response.data.map((item) => {
        return item.value;
      });

      /**
       * Este slice SOMENTE pode ficar presente DURANTE a PANDEMIA,
       * limitando os horários de atendimento
       */
      if (spot.freetax === 1) {
        data = data.slice(3);
      }

      if (spot.freetax === 0) {
        data = data.slice(1, 5);
      }

      setWorkTime(data);
    });
  };

  const handleVehicleInput = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleDateInput = (e, daysByMonth) => {
    if (e.target.name === "day") {
      setDate({ ...date, time: "" });
      setSelectedDay(daysByMonth.find((elem) => elem.d === e.target.value));
    }

    if (e.target.name === "month") {
      setDate({ ...date, day: "", time: "" });
      getDaysInMonth(e.target.value);
    }

    setDate({ ...date, [e.target.name]: e.target.value });
  };

  const handleBank = (bank) => {
    setBank(bank);
  };

  /**
   * Get Javasctipt array with all days from selected month
   */
  const getDaysInMonth = async (selectedMonth) => {
    let d = new Date(date.year, selectedMonth, 1);
    let days = [];

    while (d.getMonth() == selectedMonth) {
      days.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }

    const result = days
      .filter((item) => {
        const w = item
          .toLocaleDateString("pt-BR", { weekday: "short" })
          .substring(0, 3);

        return !blockedWeekdays.includes(w);
      })
      .map((item) => {
        const d = item.toLocaleDateString("pt-BR");
        const w = item
          .toLocaleDateString("pt-BR", { weekday: "short" })
          .substring(0, 3);

        return { d, w };
      });

    /**
     * Get All Appointments from API
     */
    const formatMonth = ("0" + (parseInt(selectedMonth) + 1)).slice(-2);

    await api
      .get(`/appointments_bymonth/${date.year}/${formatMonth}`)
      .then((response) => {
        const alreadyTaken = response.data
          .filter((item) => item.status != 7) // Enable cancelled appointments dates to be chosen again
          .map((item) => {
            return {
              date: item.date,
              day: parseInt(item.date.substring(0, 2)),
              month: parseInt(item.date.substring(3, 5)),
              time: item.time,
              status: item.status,
            };
          });

        /**
         * Add all unappointed work hours to each day, according to default work time
         */
        const addTimeArr = result.filter((item) => {
          item.time = workTime.filter((value) => {
            let takenTime = alreadyTaken.filter((time) => {
              return time.date === item.d;
            });

            takenTime = takenTime.find((element) => element.time === value);

            return takenTime ? false : true;
          });

          if (item.time.length === 0) {
            item = null;
          }

          return item ? true : false;
        });

        setDaysByMonth(addTimeArr);
      });
  };

  const handleSendData = async (e) => {
    e.preventDefault();

    if (!bank) {
      return alert("É necessário escolher o banco para realizar o pagamento.");
    }

    const vehicle_data = {
      plate: vehicle.plate.replace(/[^a-zA-Z0-9]/g, "").toUpperCase(),
      brand: vehicle.brand.toUpperCase(),
      model: vehicle.model.toUpperCase(),
      year: vehicle.year,
      detran: vehicle.detran.toUpperCase(),
      renavam: vehicle.renavam.toUpperCase(),
    };

    setButtonText(<Loader />);

    await api
      .post("/vehicles", vehicle_data)
      .then((response) => {
        handleCreateAppointment(response.data.id);
      })
      .catch((error) => {
        alert(
          "Ocorreu um erro! Verifique os dados preenchidos. Todos os campos são obrigatórios."
        );
        setButtonText(`Continuar: R$${total}`);
      });
  };

  const handleCreateAppointment = async (vehicle) => {
    const appointment_data = {
      vehicle_id: vehicle,
      date: date.day,
      time: date.time,
      category: category.id,
      subcategory: subcategory.id,
      spot: spot.id,
      location: location?.id,
      address: address.address,
      address2: address.address2,
      address_number: address.address_number,
      district: address.district,
      city: address.city,
      uf: address.uf,
      zipcode: address.zipcode,
      payment_method: method.id,
    };

    await api
      .post("/appointments", appointment_data)
      .then(async (response_appointment) => {
        await api.get("/session").then((response_session) => {
          window.PagSeguroDirectPayment.setSessionId(
            response_session.data.session_id
          );

          /**
           * Getting sender hash
           */
          window.PagSeguroDirectPayment.onSenderHashReady(async function (
            response_hash
          ) {
            if (response_hash.status == "error") {
              return false;
            }
            var hash = response_hash.senderHash; //Hash estará disponível nesta variável.

            const transaction = {
              name: profile.name,
              email: storage.email,
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
              value: response_appointment.data.total,
              hash: process.env.REACT_APP_NODE_ENV === "production" ? hash : "",
              bankName: bank,
            };

            await api
              .post("/transaction", transaction)
              .then(async (response_transaction) => {
                setEft({
                  code: response_transaction.data.code,
                  link: response_transaction.data.paymentLink,
                });

                /**
                 * Inserting the transaction code inside this appointment
                 */
                await api
                  .put(`/appointments/${response_appointment.data.id}`, {
                    status: response_transaction.data.status,
                    transaction: response_transaction.data.code,
                    payment_link: response_transaction.data.paymentLink,
                  })
                  .then(() => {});

                /**
                 * Sending eft link via email
                 */
                await api
                  .post(`/eft/${response_appointment.data.id}`)
                  .then(() => {
                    return history.push("/debito", { total });
                  });
              })
              .catch((error) => {
                alert(
                  "Ocorreu um erro ao processar. Verifique os dados e tente novamente."
                );

                deleteAppointment(response_appointment.data.id);

                setButtonText(`Continuar: R$${total}`);
              });
          });
        });
      })
      .catch((error) => {
        setButtonText(`Continuar: R$${total}`);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    /**
     * Getting user email
     */
    const storage = JSON.parse(localStorage.getItem("@visar-User"));

    setStorage(storage);

    // if (!profile || method.pagseguro !== "eft") {
    //   history.push("/");
    // }

    /**
     * Fetching default work time to offer
     */

    handleWorkTime();

    /**
     * Handling date to use in appointments
     */
    const d = new Date();
    const currentYear = d.getFullYear();
    const currentMonth = d.getMonth();
    const currentDay = d.getDate();
    setDate({ ...date, year: currentYear, currentMonth, currentDay });
  }, []);

  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={_agendamento.title} />
          <Paragraph text={_agendamento.paragraph} />
        </header>

        <form onSubmit={(e) => handleSendData(e)}>
          <TextInput
            label="Número da autorização de estampagem/emplacamento"
            type="text"
            name="detran"
            required={true}
            placeholder="Digite a autorização do DETRAN"
            state={vehicle.detran}
            onChange={handleVehicleInput}
          />
          <TextInput
            label="Código RENAVAM"
            type="text"
            name="renavam"
            required={true}
            placeholder="Digite o código do RENAVAM"
            state={vehicle.renavam}
            onChange={handleVehicleInput}
          />
          <TextInput
            label="Placa do veículo"
            type="text"
            name="plate"
            required={true}
            placeholder="Digite a placa do veículo"
            state={vehicle.plate}
            onChange={handleVehicleInput}
          />

          <div className="col2">
            <TextInput
              label="Marca"
              type="text"
              name="brand"
              required={true}
              placeholder="Marca"
              state={vehicle.brand}
              onChange={handleVehicleInput}
            />
            <TextInput
              label="Modelo"
              type="text"
              name="model"
              required={true}
              placeholder="Modelo"
              state={vehicle.model}
              onChange={handleVehicleInput}
            />
          </div>

          <TextInput
            label="Ano de Fabricação"
            type="text"
            name="year"
            required={true}
            placeholder="AAAA"
            state={vehicle.year}
            onChange={handleVehicleInput}
          />

          <div style={{ marginTop: 30 }}>
            <DropListMonth
              label="Agendamento"
              name="month"
              required={true}
              placeholder="Escolha um mês"
              currentMonth={date.currentMonth}
              customClass="appointmentInput"
              state={date.month}
              onChange={handleDateInput}
            />
            <DropListDay
              label="Dias disponíveis"
              name="day"
              month={date.month}
              year={date.year}
              required={true}
              placeholder=""
              customClass="appointmentInput"
              days={daysByMonth}
              state={date.day}
              currentMonth={date.currentMonth}
              currentDay={date.currentDay}
              methodDays={method.confirm_days}
              onChange={(e) => handleDateInput(e, daysByMonth)}
            />
            <DropListTime
              label="Horários disponíveis"
              name="time"
              required={true}
              placeholder=""
              time={selectedDay?.time || workTime}
              customClass="appointmentInput"
              state={date.time}
              onChange={handleDateInput}
            />
          </div>

          <div style={{ marginTop: 30, marginBottom: 30 }}>
            <label>Escolha o banco para pagamento:</label>

            <div style={{ flexDirection: "column" }} className="buttonGroup">
              <span
                id="bancodobrasil"
                className={`buttonWide-container ${
                  bank === "bancodobrasil" ? "active" : ""
                }`}
                style={{ marginRight: 0, marginBottom: 12 }}
                onClick={() => handleBank("bancodobrasil")}
              >
                <div className="buttonWide select">
                  <img src={bancodobrasil} alt="" />
                  <h2>Banco do Brasil</h2>
                </div>
              </span>

              <span
                id="bradesco"
                className={`buttonWide-container ${
                  bank === "bradesco" ? "active" : ""
                }`}
                style={{ marginRight: 0, marginBottom: 12 }}
                onClick={() => handleBank("bradesco")}
              >
                <div className="buttonWide select">
                  <img src={bradesco} alt="" />
                  <h2>Bradesco</h2>
                </div>
              </span>

              <span
                id="itau"
                className={`buttonWide-container ${
                  bank === "itau" ? "active" : ""
                }`}
                style={{ marginRight: 0, marginBottom: 12 }}
                onClick={() => handleBank("itau")}
              >
                <div className="buttonWide select">
                  <img src={itau} alt="" />
                  <h2>Itaú</h2>
                </div>
              </span>

              <span
                id="banrisul"
                className={`buttonWide-container ${
                  bank === "banrisul" ? "active" : ""
                }`}
                style={{ marginRight: 0, marginBottom: 12 }}
                onClick={() => handleBank("banrisul")}
              >
                <div className="buttonWide select">
                  <img src={banrisul} alt="" />
                  <h2>Banrisul</h2>
                </div>
              </span>
            </div>
          </div>

          <ButtonPrimary text={buttonText} />
        </form>
      </main>

      <Footer />
    </>
  );
};

export default AgendamentoDebito;
