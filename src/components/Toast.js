import React, { useContext } from "react";
import MainContext from "./../MainContext";

const Toast = () => {
  const { toastClosed, setToastClosed } = useContext(MainContext);

  return (
    <>
      {process.env.REACT_APP_NODE_ENV === "development" && (
        <div className={`toast ${toastClosed}`}>
          <p>
            <strong>Ambiente de desenvolvimento:</strong> As transações feitas
            neste site não são oficiais e os agendamentos são feitos{" "}
            <strong>para fins de testes apenas.</strong> Para acessar o site em
            produção use o link{" "}
            <a href="https://visaremplaca.com.br">
              https://visaremplaca.com.br
            </a>
          </p>

          <button
            className={`toast__close`}
            onClick={() => setToastClosed("closed")}
          >
            Fechar
          </button>
        </div>
      )}
    </>
  );
};

export default Toast;
