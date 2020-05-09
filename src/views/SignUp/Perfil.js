import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import {
  Title,
  Paragraph,
  ButtonPrimary,
  TextInput,
  DropListUF,
  Loader,
} from "./../../components/Elements";
import { _perfil } from "./../../views/content";

import api from "./../../services/api";
import MainContext from "./../../MainContext";

import cep from "cep-promise";

const Perfil = () => {
  let history = useHistory();

  const { setProfile } = useContext(MainContext);

  const [buttonText, setButtonText] = useState("Enviar");
  const [cpfMask, setCpfMask] = useState("999.999.999-99");
  const [phoneMask, setPhoneMask] = useState("9999-9999");

  const [data, setData] = useState({
    name: "",
    document: "",
    birthdate: "",
    area_code: "",
    phone: "",
    address: "",
    address_number: "",
    district: "",
    uf: "",
    zipode: "",
    city: "",
  });

  const handleSendProfile = async (e) => {
    e.preventDefault();

    setButtonText(<Loader />);

    await api
      .post("/profiles", data)
      .then((response) => {
        console.log(response.data);

        setButtonText("Enviar");

        setProfile(response.data);

        history.push("/metodo");
      })
      .catch((error) => {
        console.log(error.response);
        alert(
          "Ocorreu um erro! Verifique os dados preenchidos. Todos os campos são obrigatórios."
        );
        setButtonText("Enviar");
      });
  };

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={_perfil.title} />
          <Paragraph text={_perfil.paragraph} />
        </header>

        <form onSubmit={handleSendProfile}>
          <TextInput
            label="Nome completo"
            type="text"
            name="name"
            required={true}
            placeholder="Digite seu nome e sobrenome"
            value={data.name}
            onChange={handleInputChange}
          />
          <TextInput
            label="CPF/CNPJ"
            type="text"
            name="document"
            required={true}
            mask={cpfMask}
            alwaysShowMask={false}
            placeholder="Digite seu CPF ou CNPJ"
            value={data.document}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");

              if (value.length > 10) {
                setCpfMask("99.999.999/9999-99");
              } else {
                setCpfMask("999.999.999-99");
              }
            }}
          />
          <TextInput
            label="Data de Nascimento"
            type="text"
            name="birthdate"
            required={true}
            mask="99/99/9999"
            alwaysShowMask={false}
            placeholder="dd/mm/aaa"
            value={data.birthdate}
            onChange={handleInputChange}
          />

          <div className="col2-sm-first" style={{ marginBottom: 30 }}>
            <TextInput
              label="DDD"
              type="text"
              name="area_code"
              required={true}
              mask="99"
              alwaysShowMask={false}
              placeholder="00"
              value={data.area_code}
              onChange={handleInputChange}
            />
            <TextInput
              label="Telefone"
              type="text"
              name="phone"
              required={true}
              mask={phoneMask}
              alwaysShowMask={false}
              placeholder="00000-0000"
              value={data.phone}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");

                if (value.length > 7) {
                  setPhoneMask("99999-9999");
                } else {
                  setPhoneMask("9999-9999");
                }
              }}
            />
          </div>

          <TextInput
            label="CEP"
            type="text"
            name="zipode"
            required={true}
            mask="99999-999"
            alwaysShowMask={false}
            placeholder="Digite seu CEP"
            value={data.zipode}
            onChange={handleInputChange}
            onKeyUp={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");

              if (value.length >= 8) {
                cep(value).then((value) => {
                  const newData = {
                    ...data,
                    uf: value.state,
                    address: value.street,
                    district: value.neighborhood,
                    city: value.city,
                  };

                  setData(newData);
                });
              }
            }}
          />

          <div className="col2-sm-last">
            <TextInput
              label="Endereço"
              type="text"
              name="address"
              required={true}
              placeholder="Digite seu endereço"
              value={data.address}
              onChange={handleInputChange}
            />
            <TextInput
              label="Número"
              type="text"
              name="address_number"
              required={true}
              placeholder="Nº"
              value={data.address_number}
              onChange={handleInputChange}
            />
          </div>

          <TextInput
            label="Bairro"
            type="text"
            name="district"
            required={true}
            placeholder="Digite seu bairro"
            value={data.district}
            onChange={handleInputChange}
          />

          <div className="col2-sm-first">
            <DropListUF
              label="UF"
              placeholder="UF"
              name="uf"
              required={true}
              value={data.uf}
              onChange={handleInputChange}
            />
            <TextInput
              label="Cidade"
              type="text"
              name="city"
              required={true}
              placeholder="Digite sua cidade"
              value={data.city}
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

export default Perfil;
