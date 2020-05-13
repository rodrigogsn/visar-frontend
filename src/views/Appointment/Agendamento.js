import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import {
  Title,
  Paragraph,
  ButtonSuccess,
  TextInput,
  DropListDay,
  DropListMonth,
  DropListTime,
  Loader,
} from "./../../components/Elements";
import { _agendamento } from "./../../views/content";

import api from "./../../services/api";
import MainContext from "./../../MainContext";

const Agendamento = () => {
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

  console.log(subtotal);

  const total = subtotal.subcategory + subtotal.spot + subtotal.method;

  console.log(total);

  const [buttonText, setButtonText] = useState(`Pagar: R$${total}`);

  const [vehicle, setVehicle] = useState({
    plate: "",
    brand: "",
    model: "",
    year: "",
    detran: "",
    renavam: "",
  });

  const [date, setDate] = useState({
    day: "",
    month: "",
    year: "",
    time: "",
  });

  const handleVehicleInput = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleDateInput = (e) => {
    setDate({ ...date, [e.target.name]: e.target.value });
  };

  const handleAppointment = async (e) => {
    e.preventDefault();

    const vechicle_data = {
      plate: vehicle.plate.replace(/[^a-zA-Z0-9]/g, "").toUpperCase(),
      brand: vehicle.brand.toUpperCase(),
      model: vehicle.model.toUpperCase(),
      year: vehicle.year,
      detran: vehicle.detran.toUpperCase(),
      renavam: vehicle.renavam.toUpperCase(),
    };

    setButtonText(<Loader />);

    await api
      .post("/vehicles", vechicle_data)
      .then(async (response) => {
        console.log(response.data);

        console.log(response.data.id);

        console.log(date);

        const appointment_data = {
          status: "Aguardando pagamento",
          vehicle: response.data.id,
          date: date.day,
          time: date.time,
          category: category.id,
          subcategory: subcategory.id,
          location: location.id,
          spot: spot.id,
          address: profile.address,
          address2: profile.address2,
          address_number: profile.address_number,
          district: profile.district,
          uf: profile.uf,
          zipcode: profile.zipcode,
          total: 110,
          payment_method: method[0].id,
          transaction: "CODIGOPAGSEGURO",
        };

        console.log(appointment_data);

        await api
          .post("/appointments", appointment_data)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error.response);
            alert(
              "Ocorreu um erro! Verifique os dados preenchidos. Todos os campos são obrigatórios."
            );
            setButtonText(`Pagar: R$${total}`);
          });

        setButtonText(`Pagar: R$${total}`);
      })
      .catch((error) => {
        console.log(error.response);
        alert(
          "Ocorreu um erro! Verifique os dados preenchidos. Todos os campos são obrigatórios."
        );
        setButtonText(`Pagar: R$${total}`);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!profile) {
      history.push("/");
    }

    const calc = subtotal.subcategory + subtotal.location + subtotal.method;

    const d = new Date();
    const ano = d.getFullYear();

    setDate({ ...date, year: ano });
  }, []);

  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={_agendamento.title} />
          <Paragraph text={_agendamento.paragraph} />
        </header>

        <form onSubmit={(e) => handleAppointment(e)}>
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
              style="appointmentInput"
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
              style="appointmentInput"
              state={date.days}
              blockedWeeekdays={["dom"]}
              onChange={handleDateInput}
            />
            <DropListTime
              label="Horários disponíveis"
              name="time"
              required={true}
              placeholder=""
              style="appointmentInput"
              state={date.time}
              onChange={handleDateInput}
            />
          </div>

          <ButtonSuccess text={buttonText} />
        </form>
      </main>

      <Footer />
    </>
  );
};

export default Agendamento;
