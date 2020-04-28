import React from "react";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import {
  Title,
  Paragraph,
  ButtonPrimary,
  TextInput,
  DropList,
} from "./../../components/Elements";
import { _perfil } from "./../../views/content";

const Perfil = () => {
  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={_perfil.title} />
          <Paragraph text={_perfil.paragraph} />
        </header>

        <form>
          <TextInput
            label="Nome completo"
            type="text"
            placeholder="Digite seu nome e sobrenome"
          />
          <TextInput
            label="CPF/CNPJ"
            type="text"
            placeholder="Digite seu CPF ou CNPJ"
          />
          <TextInput
            label="Data de Nascimento"
            type="text"
            placeholder="dd/mm/aaa"
          />

          <div className="col2-sm-first" style={{ marginBottom: 30 }}>
            <TextInput label="DDD" type="text" placeholder="00" />
            <TextInput label="Telefone" type="text" placeholder="00000-0000" />
          </div>

          <TextInput label="CEP" type="text" placeholder="Digite seu CEP" />

          <div className="col2-sm-last">
            <TextInput
              label="Endereço"
              type="text"
              placeholder="Digite seu endereço"
            />
            <TextInput label="Número" type="text" placeholder="Nº" />
          </div>

          <TextInput
            label="Bairro"
            type="text"
            placeholder="Digite seu bairro"
          />

          <div className="col2-sm-first">
            <DropList label="UF" name="uf" placeholder="UF" />
            <TextInput
              label="Cidade"
              type="text"
              placeholder="Digite sua cidade"
            />
          </div>

          <ButtonPrimary text="Enviar" link="/cadastro" />
        </form>
      </main>

      <Footer />
    </>
  );
};

export default Perfil;
