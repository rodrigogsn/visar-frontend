import React from 'react';
import { Image } from './../components/Elements';
import logo from './../assets/img/gomes.png';
import detransp from './../assets/img/detransp.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <section className="footerTop">
        <div>
          <h3>Sobre a Visar Emplaca</h3>
          <p>
            A Visar Emplaca efetua emplacamento de veículos de diversos tipos,
            mediante autorização de emplacamento do DETRAN. Atendemos sob
            consulta à Baixada Santista (Santos, Guarujá, Cubatão, Praia Grande
            e São Vicente). Em breve mais locais estarão à disposição.
          </p>
          <img
            src={detransp}
            className="logo-detransp-mini"
            alt="Empresa credenciada pelo Detran SP"
          />
        </div>

        <div>
          <h3>Avisos</h3>
          <p>
            Para dar sequência ao emplacamento do seu veículo, é necessário ter
            o número do <strong>chassis</strong>, a <strong>placa</strong> e o{' '}
            <strong>RENAVAM</strong>. Se os dados não forem validados por nossa
            equipe, o agendamento poderá ser cancelado.
          </p>
        </div>

        <div>
          <h3>Fale Conosco</h3>

          <p>
            <strong>Telefone:</strong>
            <br />
            (13) 3222-5442
            <br />
            (13) 3223-9102
          </p>

          <p style={{ marginTop: 15 }}>
            <strong>Email:</strong>
            <br />
            contato@visaremplaca.com.br
          </p>
        </div>

        <div>
          <h3>Siga-nos!</h3>
          <p>Curta a Visar Emplaca e fique por dentro das novidades.</p>

          <span style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
            <a
              href="https://www.instagram.com/visaremplaca"
              className="socialIcon"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                style={{ fontSize: 26, marginRight: 8 }}
              />
            </a>
            <a
              href="https://www.facebook.com/visaremplaca"
              className="socialIcon"
            >
              <FontAwesomeIcon icon={faFacebookF} style={{ fontSize: 24 }} />
            </a>
          </span>
        </div>
      </section>

      <section className="footerBottom">
        <div className="copyright">
          <p>
            ©1990~{currentYear}, Visar Emplaca - Todos os direitos reservados.
            <br />
            <strong>Razão Social:</strong> Visar Emplaca Veículos Ltda. |{' '}
            <strong>CNPJ:</strong> 25.025.838/0001-60 |{' '}
            <strong>Endereço:</strong> Rua Amador Bueno, 361 - Centro -
            Santos/SP - CEP: 11013-153
          </p>
        </div>

        <div className="logoWrapper">
          <a href="https://gomes.dev">
            <Image source={logo} alt="Gomes Desenvolvimento Web" />
          </a>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
