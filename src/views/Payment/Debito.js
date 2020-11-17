import React, { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import {
  Title,
  Paragraph,
  Subtitle,
  ButtonSuccess,
  Warning,
} from './../../components/Elements';
import { _eft } from './../../views/content';

import MainContext from './../../MainContext';

const Sucesso = () => {
  let history = useHistory();
  const location = useLocation();

  const { profile, eft } = useContext(MainContext);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!profile) {
      history.push('/');
    }
  }, []);

  return (
    <>
      <Header />

      <main className="default">
        <header>
          <Title text={_eft.title} />

          <Subtitle text={_eft.subtitle} />
        </header>

        <section>
          <Paragraph text={_eft.paragraph} />

          <a href={eft.link} target="_blank" rel="noopener noreferrer">
            <ButtonSuccess text={`Pagar: ${location.state.total}`} />
          </a>

          <Warning text={_eft.legal} />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Sucesso;
