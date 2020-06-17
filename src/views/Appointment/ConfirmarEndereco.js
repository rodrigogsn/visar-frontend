import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import {
  Title,
  Paragraph,
  ButtonPrimary,
  ButtonSecondary,
  MiniLink,
} from "./../../components/Elements";
import { _endereco } from "./../../views/content";

import api from "./../../services/api";
import MainContext from "./../../MainContext";

const ConfirmarEndereco = () => {
  let history = useHistory();

  const {
    profile,
    setAddress,
    setLocation,
    subtotal,
    setSubtotal,
  } = useContext(MainContext);

  const [locations, setLocations] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);

  const handleLocations = async () => {
    await api
      .get("/locations")
      .then((response) => {
        const city = response.data.find((el) => el.name === profile.city);

        setSelectedCity(city);

        /**
         * Fetching current available cities from backend
         */
        let addLocation = [];

        response.data.map((location) => {
          addLocation.push(location.name);
        });

        setLocations(addLocation);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleConfirm = () => {
    setAddress(profile);

    setLocation(selectedCity);

    setSubtotal({
      ...subtotal,
      spot: selectedCity.increase - selectedCity.discount,
    });

    console.log(subtotal, selectedCity);

    history.push("/metodo");
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!profile) {
      history.push("/");
    }

    handleLocations();
  }, []);

  const current_address = (
    <p>
      Endereço cadastrado:{" "}
      <strong>
        {profile.address}, {profile.address_number} - {profile.city}/
        {profile.uf} - CEP: {profile.zipcode} - Complemento:{" "}
        {profile.address2 || "Nenhum"}
      </strong>
    </p>
  );

  console.log(locations.toString().replace(/[,]/g, ", "));
  return (
    <>
      <Header />

      <main className="default">
        <header>
          {selectedCity ? (
            <>
              <Title text={_endereco.title} />
              {current_address}
            </>
          ) : (
            <>
              <Title text={_endereco.title} />
              <Paragraph
                text={
                  _endereco.forbidden +
                  locations.toString().replace(/[,]/g, ", ")
                }
              />
              {current_address}
            </>
          )}
        </header>

        {selectedCity ? (
          <>
            <ButtonPrimary text="Confirmar Endereço" press={handleConfirm} />
            <MiniLink text="Usar outro endereço" link="/atualizar-endereco" />
          </>
        ) : (
          <ButtonSecondary
            text="Usar outro endereço"
            link="/atualizar-endereco"
          />
        )}
      </main>

      <Footer />
    </>
  );
};

export default ConfirmarEndereco;
