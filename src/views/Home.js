import React, { useEffect } from "react";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import {
  Title,
  Paragraph,
  ButtonPrimary,
  Image,
} from "./../components/Elements";
import { _home } from "./../views/content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import image from "./../assets/img/hero-ilust-1.png";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      <main className="home">
        <header>
          <Title text={_home.title} />

          <Paragraph text={_home.paragraph} />

          <span className="detran">
            Empresa credenciada pelo Detran-SP{" "}
            <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: 16 }} />
          </span>

          <ButtonPrimary text="Agendar agora" link="/start" />
        </header>
        <Image source={image} alt="Agendar agora" />
      </main>

      <Footer />
    </>
  );
};

export default Home;
