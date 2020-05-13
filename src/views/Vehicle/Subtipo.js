import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import {
  Title,
  Paragraph,
  ButtonPrimary,
  ButtonDisabled,
} from "./../../components/Elements";
import { _subtipo } from "./../../views/content";

import api from "./../../services/api";
import MainContext from "./../../MainContext";

const Subtipo = () => {
  let history = useHistory();

  const {
    profile,
    category,
    setSubcategory,
    subtotal,
    setSubtotal,
  } = useContext(MainContext);

  const [options, setOptions] = useState("");

  const [subcategories, setSubcategories] = useState("");

  const [button, setButton] = useState(<ButtonDisabled text="Continuar" />);

  const handleSubcategories = async () => {
    await api
      .get("/vehicle_subcategories")
      .then((response) => {
        const data = response.data.filter(
          (item) => item.category_id === category.id
        );

        const html = data.map((subcategory) => (
          <option key={subcategory.id} value={subcategory.id}>
            {subcategory.name}
          </option>
        ));

        setSubcategories(data);

        setOptions(html);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleInputChange = (e) => {
    const selected = subcategories.filter((item) => item.id == e.target.value);

    setSubcategory(selected[0]);

    if (e.target.value !== "") {
      setButton(<ButtonPrimary text="Continuar" press={handleClick} />);

      setSubtotal({ ...subtotal, subcategory: selected[0].value });

      console.log("Valor por Subtipo:", selected[0].value, "Total:", subtotal);
    } else {
      setButton(<ButtonDisabled text="Continuar" />);
    }
  };

  const handleClick = (location) => {
    history.push("/regiao");
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!profile) {
      history.push("/");
    }

    handleSubcategories();
  }, []);

  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={category.name} />
          <Paragraph text={_subtipo.paragraph} />
        </header>

        <div>
          <select
            id="subcategories"
            name="subcategories"
            onChange={handleInputChange}
          >
            <option value="">Escolha um subtipo</option>
            {options}
          </select>
        </div>

        <form>{button}</form>
      </main>

      <Footer />
    </>
  );
};

export default Subtipo;
