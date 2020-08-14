import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import {
  Title,
  Paragraph,
  ButtonPrimary,
  TextInput,
  TextInputDisabled,
  Loader,
} from "./../../components/Elements";
import { _atualizar_endereco } from "./../../views/content";

import api from "./../../services/api";
import MainContext from "./../../MainContext";

import cep from "cep-promise";

const AtualizarEndereco = () => {
  let history = useHistory();

  const {
    profile,
    setLocation,
    subtotal,
    setSubtotal,
    setAddress,
  } = useContext(MainContext);

  const [buttonText, setButtonText] = useState("Enviar");
  const [validation, setValidation] = useState({
    zipcode: "",
  });
  const [data, setData] = useState({
    address: "",
    address2: "",
    address_number: "",
    district: "",
    uf: "",
    zipcode: "",
    city: "",
  });

  const findCep = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");

    if (value.length >= 8) {
      cep(value)
        .then((value) => {
          const newData = {
            ...data,
            uf: value.state,
            address: value.street,
            district: value.neighborhood,
            city: value.city,
          };

          setData(newData);
          setValidation({ ...validation, zipcode: "" });
        })
        .catch((error) => {
          setValidation({ ...validation, zipcode: "inputError" });
        });
    }
  };

  const handleSendAddress = async (e) => {
    e.preventDefault();

    var hasError = false;

    const checkHasError = (key) => {
      if (validation[key] !== "") {
        hasError = true;
      }
    };

    Object.keys(validation).map((key) => {
      checkHasError(key);
    });

    if (hasError) {
      window.scrollTo(0, 0);
      alert("Alguns campos precisam de atenção.");
      return;
    }

    const request = {
      address: data.address,
      address2: data.address2,
      address_number: data.address_number,
      district: data.district,
      uf: data.uf,
      zipcode: data.zipcode.replace(/[^a-zA-Z0-9]/g, ""),
      city: data.city,
    };

    setButtonText(<Loader />);

    await api
      .get("/locations")
      .then((response) => {
        const city = response.data.find((el) => el.name === request.city);

        if (!city) {
          setButtonText("Enviar");
          return alert("Não antendemos essa região ainda.");
        }

        setLocation(city);
        setSubtotal({
          ...subtotal,
          spot: city.increase - city.discount,
        });
        setAddress(request);
        setButtonText("Enviar");

        history.push("/metodo");
      })
      .catch((error) => {
        setButtonText("Enviar");

        return alert("Ocorreu um erro! Tente novamente, por favor.");
      });
  };

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

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
          <Title text={_atualizar_endereco.title} />
          <Paragraph text={_atualizar_endereco.paragraph} />
        </header>

        <form onSubmit={handleSendAddress}>
          <TextInput
            label="CEP"
            type="text"
            name="zipcode"
            style={validation.zipcode}
            required={true}
            mask="99999-999"
            alwaysShowMask={false}
            placeholder="Digite seu CEP"
            state={data.zipcode}
            onChange={handleInputChange}
            onBlur={(e) => findCep(e)}
          />

          <div className="col2-sm-last">
            <TextInputDisabled
              label="Endereço"
              type="text"
              name="address"
              required={true}
              placeholder="Digite seu endereço"
              state={data.address}
              onChange={handleInputChange}
            />
            <TextInput
              label="Número"
              type="text"
              name="address_number"
              required={true}
              placeholder="Nº"
              state={data.address_number}
              onChange={handleInputChange}
            />
          </div>

          <TextInput
            label="Complemento"
            type="text"
            name="address2"
            placeholder="Opcional"
            state={data.address2}
            onChange={handleInputChange}
          />
          <TextInputDisabled
            label="Bairro"
            type="text"
            name="district"
            required={true}
            placeholder="Digite seu bairro"
            state={data.district}
            onChange={handleInputChange}
          />

          <div className="col2-sm-first">
            <TextInputDisabled
              label="UF"
              name="uf"
              required={true}
              alwaysShowMask={false}
              placeholder="UF"
              state={data.uf}
              onChange={handleInputChange}
            />
            <TextInputDisabled
              label="Cidade"
              type="text"
              name="city"
              required={true}
              placeholder="Digite sua cidade"
              state={data.city}
              onChange={handleInputChange}
            />
          </div>

          <ButtonPrimary text={buttonText} />
        </form>
      </main>

      <Footer />
    </>
  );
};

export default AtualizarEndereco;
