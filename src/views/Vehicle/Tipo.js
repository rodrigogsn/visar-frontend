import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import { Title, Paragraph } from "./../../components/Elements";
import { _tipo } from "./../../views/content";

import { ReactComponent as SvgCredito } from "./../../assets/img/credit-card-option.svg";

const Tipo = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={_tipo.title} />
          <Paragraph text={_tipo.paragraph} />
        </header>

        <div className="typeGroup">
          <Link className="typeButton" to="/">
            <div class="typeBox">
              <SvgCredito class="typeImage" alt="" />
              <h2>De Passageiros</h2>
            </div>
          </Link>

          <Link className="typeButton" to="/">
            <div>
              <SvgCredito class="typeImage" alt="" />
              <h2>De Carga</h2>
            </div>
          </Link>

          <Link className="typeButton" to="/">
            <div>
              <SvgCredito class="typeImage" alt="" />
              <h2>Misto</h2>
            </div>
          </Link>

          <Link className="typeButton" to="/">
            <div>
              <SvgCredito class="typeImage" alt="" />
              <h2>De Competição</h2>
            </div>
          </Link>

          <Link className="typeButton" to="/">
            <div>
              <SvgCredito class="typeImage" alt="" />
              <h2>De Tração</h2>
            </div>
          </Link>

          <Link className="typeButton" to="/">
            <div>
              <SvgCredito class="typeImage" alt="" />
              <h2>Especial</h2>
            </div>
          </Link>

          <Link className="typeButton" to="/">
            <div>
              <SvgCredito class="typeImage" alt="" />
              <h2>De Coleção</h2>
            </div>
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Tipo;
