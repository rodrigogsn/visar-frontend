import React, { useEffect } from "react";
import { Link } from "react-router-dom";
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

import useWindowDimensions from "./../utils/ViewportSize";
import banner from "./../assets/img/banner-visar.png";
import bannerMobile from "./../assets/img/banner-visar-mobile.png";

const Home = () => {
  const { width } = useWindowDimensions();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <aside>
        <Link to="/start">
          <Image
            source={width <= 700 ? bannerMobile : banner}
            alt="Promoção válida somente para agendamento de emplacamento pelo site: carros (2 placas) R$170,00 e moto (1 placa) R$90,00. Nota: somente para veículos de passageiros e/ou misto, exceto micro-ônibus, ônibus, bonde, reboque ou semi-reboque e caminhão."
          />
        </Link>
      </aside>

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
