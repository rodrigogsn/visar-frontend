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

  const { profile, subcategory, setSpot } = useContext(MainContext);

  const [spots, setSpots] = useState("");

  const handleSpots = async () => {
    await api
      .get("/spots")
      .then((response) => {
        const data = response.data.map((spot) => {
          const incompany_isValid =
            !subcategory[0].incompany && spot.incompany ? false : true;

          const disabledClass =
            !spot.active || !incompany_isValid
              ? "buttonWide customHeight disabled"
              : "buttonWide customHeight";

          const active = !spot.active || !incompany_isValid ? false : true;

          return (
            <div
              key={spot.id}
              className={disabledClass}
              onClick={() => {
                if (!active) {
                  return;
                }
                handleClick(spot);
              }}
            >
              <h2>{spot.name}</h2>
              <p>{spot.description}</p>
            </div>
          );
        });

        setSpots(data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleClick = (spot, active) => {
    setSpot(spot);

    history.push("/metodo");
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
