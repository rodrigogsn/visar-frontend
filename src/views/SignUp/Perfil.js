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
import { _perfil } from "./../../views/content";

import api from "./../../services/api";
import MainContext from "./../../MainContext";

import cep from "cep-promise";

const Perfil = () => {
  let history = useHistory();

  const { setProfile } = useContext(MainContext);

  const [buttonText, setButtonText] = useState("Enviar");

  const [cpfMask, setCpfMask] = useState("999.999.999-99");

  const [validation, setValidation] = useState({
    document: "",
    birthdate: "",
    area_code: "",
    phone: "",
    zipcode: "",
  });

  const [data, setData] = useState({
    name: "",
    document: "",
    birthdate: "",
    area_code: "",
    phone: "",
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
          console.log(error);
        });
    }
  };

  const keyValidate = (e) => {
    if ((e.which >= 48 && e.which <= 57) || (e.which >= 96 && e.which <= 105)) {
      return true;
    }

    return false;
  };

  const cpfValidate = (data) => {
    let cpf = data.replace(/[^a-zA-Z0-9]/g, "");

    let numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length !== 11) return false;
    for (i = 0; i < cpf.length - 1; i++)
      if (cpf.charAt(i) != cpf.charAt(i + 1)) {
        digitos_iguais = 0;
        break;
      }
    if (!digitos_iguais) {
      numeros = cpf.substring(0, 9);
      digitos = cpf.substring(9);
      soma = 0;
      for (i = 10; i > 1; i--) soma += numeros.charAt(10 - i) * i;
      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado != digitos.charAt(0)) return false;
      numeros = cpf.substring(0, 10);
      soma = 0;
      for (i = 11; i > 1; i--) soma += numeros.charAt(11 - i) * i;
      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado != digitos.charAt(1)) return false;
      return true;
    } else return false;
  };

  const cnpjValidate = (data) => {
    let cnpj = data.replace(/[^a-zA-Z0-9]/g, "");

    if (cnpj == "") return false;

    if (cnpj.length != 14) return false;

    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj == "00000000000000" ||
      cnpj == "11111111111111" ||
      cnpj == "22222222222222" ||
      cnpj == "33333333333333" ||
      cnpj == "44444444444444" ||
      cnpj == "55555555555555" ||
      cnpj == "66666666666666" ||
      cnpj == "77777777777777" ||
      cnpj == "88888888888888" ||
      cnpj == "99999999999999"
    )
      return false;

    // Valida DVs
    let tamanho, numeros, digitos, soma, pos, resultado;

    tamanho = cnpj.length - 2;
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;

    return true;
  };

  const documentValidate = () => {
    if (cpfValidate(data.document) || cnpjValidate(data.document)) {
      setValidation({ ...validation, document: "" });
    } else {
      setValidation({ ...validation, document: "inputError" });
    }
  };

  const emptyMaskValidate = (e) => {
    const index = e.target.value.indexOf("_");

    if (index !== -1) {
      setValidation({ ...validation, [e.target.name]: "inputError" });
    } else {
      setValidation({ ...validation, [e.target.name]: "" });
    }
  };

  const handleSendProfile = async (e) => {
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
      name: data.name,
      document: data.document.replace(/[^a-zA-Z0-9]/g, ""),
      birthdate: data.birthdate,
      area_code: data.area_code,
      phone: data.phone.replace(/[^a-zA-Z0-9]/g, ""),
      address: data.address,
      address2: data.address2,
      address_number: data.address_number,
      district: data.district,
      uf: data.uf,
      zipcode: data.zipcode.replace(/[^a-zA-Z0-9]/g, ""),
      city: data.city,
    };

    console.log(request);

    setButtonText(<Loader />);

    await api
      .post("/profiles", request)
      .then((response) => {
        console.log(response.data);

        setButtonText("Enviar");

        setProfile(response.data);

        history.push("/tipo");
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
            state={data.name}
            onChange={handleInputChange}
          />
          <TextInput
            label="CPF/CNPJ"
            type="text"
            name="document"
            required={true}
            style={validation.document}
            mask={cpfMask}
            alwaysShowMask={false}
            placeholder="Digite seu CPF ou CNPJ"
            state={data.document}
            onChange={handleInputChange}
            onBlur={documentValidate}
            onKeyDown={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");

              if (value.length > 10 && keyValidate(e)) {
                setCpfMask("99.999.999/9999-99");
              } else if (value.length < 11) {
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
            placeholder="dd/mm/aaaa"
            state={data.birthdate}
            onChange={handleInputChange}
            style={validation.birthdate}
            onBlur={(e) => emptyMaskValidate(e)}
          />

          <div className="col2-sm-first" style={{ marginBottom: 30 }}>
            <TextInput
              label="DDD"
              type="text"
              name="area_code"
              required={true}
              alwaysShowMask={false}
              placeholder="00"
              mask="99"
              state={data.area_code}
              onChange={handleInputChange}
              style={validation.area_code}
              onBlur={(e) => emptyMaskValidate(e)}
            />
            <TextInput
              label="Telefone"
              type="text"
              name="phone"
              required={true}
              mask="999999999"
              alwaysShowMask={false}
              placeholder="00000-0000"
              state={data.phone}
              onChange={handleInputChange}
            />
          </div>

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

export default Perfil;
