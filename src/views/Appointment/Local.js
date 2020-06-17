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

  const {
    profile,
    subcategory,
    setSpot,
    setAddress,
    location,
    setLocation,
    subtotal,
    setSubtotal,
  } = useContext(MainContext);
  const [spots, setSpots] = useState("");

  const handleClick = async (spot) => {
    setSpot(spot);

    if (spot.freetax) {
      /**
       * If the job will happen in company, set all values and default address
       */

      await api
        .get("/locations")
        .then((response) => {
          const city = response.data.find((el) => el.name === profile.city);

          setLocation(city);
          setSubtotal({ ...subtotal, spot: 0 });
          setAddress(profile);

          console.log(location);
        })
        .catch((error) => {
          console.log(error);
          return alert("Ocorreu um erro! Tente novamente, por favor.");
        });

      history.push("/metodo");
    } else {
      /**
       * If the job will happen in client, they need to confirm their own address
       */
      history.push("/confirmar-endereco");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!profile) {
      history.push("/");
    }

    const handleSpots = async () => {
      await api
        .get("/spots")
        .then((response) => {
          const data = response.data.map((spot) => {
            const freetax =
              !subcategory.incompany && spot.freetax ? false : true;

            const disabledClass =
              !spot.active || !freetax
                ? "buttonWide customHeight disabled"
                : "buttonWide customHeight";

            const active = !spot.active || !freetax ? false : true;

            return (
              <span
                key={spot.id}
                className="buttonWide-container"
                onClick={() => {
                  if (!active) {
                    return;
                  }

                  handleClick(spot);
                }}
              >
                <div className={disabledClass}>
                  <h2>{spot.name}</h2>
                  <p>{spot.description}</p>
                </div>
              </span>
            );
          });

          setSpots(data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    };
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
