import React from "react";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import {
  Title,
  Paragraph,
  ButtonPrimary,
  Image,
} from "./../components/Elements";
import { _home } from "./../views/content";

import image from "./../assets/img/hero-ilust-1.png";

const Home = () => {
  return (
    <>
      <Header />

      <main className="home">
        <header>
          <Title text={_home.title} />
          <Paragraph text={_home.paragraph} />
          <ButtonPrimary text="Agendar agora" link="/start" />
        </header>
        <Image source={image} alt="Agendar agora" />
      </main>

      <Footer />
    </>
  );
};

export default Home;
