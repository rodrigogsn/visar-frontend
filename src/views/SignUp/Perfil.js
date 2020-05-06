import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import {
  Title,
  Paragraph,
  ButtonPrimary,
  TextInput,
  DropList,
  Loader,
} from "./../../components/Elements";
import { _perfil } from "./../../views/content";

import api from "./../../services/api";
import MainContext from "./../../MainContext";

const Perfil = () => {
  let history = useHistory();

  const { setProfile } = useContext(MainContext);

  const [buttonText, setButtonText] = useState("Enviar");

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
            placeholder="Digite seu nome e sobrenome"
            value={data.name}
            onChange={handleInputChange}
          />
          <TextInput
            label="CPF/CNPJ"
            type="text"
            name="document"
            placeholder="Digite seu CPF ou CNPJ"
            value={data.document}
            onChange={handleInputChange}
          />
          <TextInput
            label="Data de Nascimento"
            type="text"
            name="birthdate"
            placeholder="dd/mm/aaa"
            value={data.birthdate}
            onChange={handleInputChange}
          />

          <div className="col2-sm-first" style={{ marginBottom: 30 }}>
            <TextInput
              label="DDD"
              type="text"
              name="area_code"
              placeholder="00"
              value={data.area_code}
              onChange={handleInputChange}
            />
            <TextInput
              label="Telefone"
              type="text"
              name="phone"
              placeholder="00000-0000"
              value={data.phone}
              onChange={handleInputChange}
            />
          </div>

          <TextInput
            label="CEP"
            type="text"
            name="zipode"
            placeholder="Digite seu CEP"
            value={data.zipode}
            onChange={handleInputChange}
          />

          <div className="col2-sm-last">
            <TextInput
              label="Endereço"
              type="text"
              name="address"
              placeholder="Digite seu endereço"
              value={data.address}
              onChange={handleInputChange}
            />
            <TextInput
              label="Número"
              type="text"
              name="address_number"
              placeholder="Nº"
              value={data.address_number}
              onChange={handleInputChange}
            />
          </div>

          <TextInput
            label="Bairro"
            type="text"
            name="district"
            placeholder="Digite seu bairro"
            value={data.district}
            onChange={handleInputChange}
          />

          <div className="col2-sm-first">
            <DropList
              label="UF"
              placeholder="UF"
              name="uf"
              value={data.uf}
              onChange={handleInputChange}
            />
            <TextInput
              label="Cidade"
              type="text"
              name="birthdate"
              placeholder="Digite sua cidade"
              value={data.birthdate}
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
