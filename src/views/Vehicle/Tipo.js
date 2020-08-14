import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import { Title, Paragraph } from "./../../components/Elements";
import { _tipo } from "./../../views/content";

import api from "./../../services/api";
import MainContext from "./../../MainContext";

const Tipo = () => {
  let history = useHistory();

  const { profile, setCategory, setSubcategory } = useContext(MainContext);

  const [categories, setCategories] = useState();

  const handleCategories = async () => {
    await api
      .get("/vehicle_categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {});
  };

  const handleSubcategories = async (category_id) => {
    await api
      .get("/vehicle_subcategories")
      .then((response) => {
        const subcategories = response.data;

        const subcategory = subcategories.filter(
          (item) => item.category_id === category_id
        );

        // Set all subcategories for context (next screen will filter them)
        setSubcategory(subcategory);
      })
      .catch((error) => {});
  };

  const saveCategory = (key) => {
    const category = categories.find((item) => item.id === key);

    setCategory(category); // Set category full object for context

    handleSubcategories(category.id); // Select the id from selected category

    history.push("/subtipo");
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!profile) {
      history.push("/");
    }

    handleCategories();
  }, []);

  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={_tipo.title} />
          <p className="customParagraph">
            Olá <strong>{profile.name}</strong>!
          </p>
          <Paragraph text={_tipo.paragraph} />
        </header>

        <div className="typeGroup">
          <div className="typeButton" onClick={() => saveCategory(1)}>
            {/* <SvgCredito className="typeImage" alt="" /> */}
            <h2>De Passageiros</h2>
          </div>

          <div className="typeButton" onClick={() => saveCategory(2)}>
            {/* <SvgCredito className="typeImage" alt="" /> */}
            <h2>De Carga</h2>
          </div>

          <div className="typeButton" onClick={() => saveCategory(3)}>
            {/* <SvgCredito className="typeImage" alt="" /> */}
            <h2>Misto</h2>
          </div>

          <div className="typeButton" onClick={() => saveCategory(4)}>
            {/* <SvgCredito className="typeImage" alt="" /> */}
            <h2>De Competição</h2>
          </div>

          <div className="typeButton" onClick={() => saveCategory(5)}>
            {/* <SvgCredito className="typeImage" alt="" /> */}
            <h2>De Tração</h2>
          </div>

          <div className="typeButton" onClick={() => saveCategory(6)}>
            {/* <SvgCredito className="typeImage" alt="" /> */}
            <h2>Especial</h2>
          </div>

          <div className="typeButton" onClick={() => saveCategory(7)}>
            {/* <SvgCredito className="typeImage" alt="" /> */}
            <h2>De Coleção</h2>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Tipo;
