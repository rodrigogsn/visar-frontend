import React from "react";
import { Image } from "./../components/Elements";
import logo from "./../assets/img/gomes.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <section className="footerTop">
        <div>
          <h3>Sobre a Visar Emplaca</h3>
          <p>
            When you put money directly to a problem, it makes a good headline.
            It makes a good campaign slogan. You get to claim that you've
            engaged in these activities within an election cycle. But certain
            investments take longer than an election cycle.
          </p>
        </div>

        <div>
          <h3>Avisos Legais</h3>
          <p>
            It's actually the minority of religious people who rejects science
            or feel threatened by it or want to sort of undo or restrict the...
            where science can go. The rest, you know, are just fine with
            science. And it has been that way ever since the beginning.
          </p>
        </div>

        <div>
          <h3>Fale Conosco</h3>

          <div className="row">
            <p>
              <strong>Telefone:</strong>
              <br />
              (13)3222-5442
              <br />
              (13)3223-9102
            </p>

            <p>
              <strong>Email:</strong>
              <br />
              contato@visaremplaca.com.br
            </p>
          </div>
        </div>

        <div>
          <h3>Novidades</h3>
          <p>
            It's actually the minority of religious people who rejects science
            or feel threatened by it or want to sort of undo.
          </p>
          <span>
            <p>Instagram</p>
            <p>Facebook</p>
          </span>
        </div>
      </section>

      <section className="footerBottom">
        <div className="copyright">
          <p>
            ©1990~{currentYear}, Visar Emplaca - Todos os direitos reservados.
            <br />
            <strong>Razão Social:</strong> Visar Emplaca Veículos Ltda. |{" "}
            <strong>CNPJ:</strong> 25.025.838/0001-60 |{" "}
            <strong>Endereço:</strong> Rua Amador Bueno, 361 - Centro -
            Santos/SP
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
