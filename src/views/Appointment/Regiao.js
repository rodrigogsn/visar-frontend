import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import { Title, Paragraph } from "./../../components/Elements";
import { _regiao } from "./../../views/content";

import api from "./../../services/api";
import MainContext from "./../../MainContext";

const Regiao = () => {
  let history = useHistory();

  const { profile, setLocation, setTotal, method } = useContext(MainContext);

  const [locations, setLocations] = useState("");

  const handleLocations = async () => {
    await api
      .get("/locations")
      .then((response) => {
        const data = response.data.map((location) => (
          <div
            key={location.id}
            className="buttonWide customHeight"
            onClick={() => {
              handleClick(location);
            }}
          >
            <h2>{location.name}</h2>
          </div>
        ));

        setLocations(data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleClick = (location) => {
    setLocation(location);
    history.push("/local");
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!profile) {
      history.push("/");
    }

    handleLocations();
  }, []);

  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={_regiao.title} />
          <Paragraph text={_regiao.paragraph} />
        </header>

        <div className="buttonGroup">{locations}</div>
      </main>

      <Footer />
    </>
  );
};

export default Regiao;
