import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import { Title, Paragraph } from "./../../components/Elements";
import { _local } from "./../../views/content";

import api from "./../../services/api";
import MainContext from "./../../MainContext";

const Local = () => {
  let history = useHistory();

  const { profile, setSpot, setTotal, method } = useContext(MainContext);

  const [spots, setSpots] = useState("");

  const handleSpots = async () => {
    await api
      .get("/spots")
      .then((response) => {
        const data = response.data.map((spot) => (
          <div
            key={spot.id}
            className="buttonWide"
            style={{ minHeight: "fit-content" }}
            onClick={() => {
              handleClick(spot);
            }}
          >
            <h2>{spot.name}</h2>
            <p>Descrição</p>
            <span>R$ 000</span>
          </div>
        ));

        setSpots(data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleClick = (spot) => {
    setSpot(spot);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!profile) {
      history.push("/");
    }

    handleSpots();
  }, []);

  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={_local.title} />
          <Paragraph text={_local.paragraph} />
        </header>

        <div className="buttonGroup">{spots}</div>
      </main>

      <Footer />
    </>
  );
};

export default Local;
