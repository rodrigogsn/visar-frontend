import React, { useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import {
  Title,
  Paragraph,
  ButtonPrimary,
  ButtonSecondary,
  ButtonSuccess,
} from "./../../components/Elements";
import { _confirmacao } from "./../../views/content";

// import { confirm } from "./../../services/auth";

const Confirmacao = () => {
  let history = useHistory();

  const handleCLick = () => {
    /// TEST ONLY, REFACTOR ONCE CRUD IS DONE
    history.push("/perfil");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={_confirmacao.title} />
          <Paragraph text={_confirmacao.paragraph} />
        </header>

        <div className="buttonGroup">
          <ButtonPrimary text="Reenviar confirmação" link="/" />
          <ButtonSecondary text="Cadastrar novamente" link="/cadastro" />
          {/* <ButtonSuccess
            text="função de Teste: Confirme aqui"
            press={handleCLick}
          /> */}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default withRouter(Confirmacao);
