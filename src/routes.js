import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import Home from "./views/Home";
import Login from "./views/Login";

import Start from "./views/SignUp/Start";
import Cadastro from "./views/SignUp/Cadastro";
import Confirmacao from "./views/SignUp/Confirmacao";
import Perfil from "./views/SignUp/Perfil";
import Atualizar from "./views/SignUp/Atualizar";

import Tipo from "./views/Vehicle/Tipo";
import Subtipo from "./views/Vehicle/Subtipo";

import Regiao from "./views/Appointment/Regiao";
import Local from "./views/Appointment/Local";
import AgendamentoBoleto from "./views/Appointment/AgendamentoBoleto";
import AgendamentoCard from "./views/Appointment/AgendamentoCard";
import AgendamentoDebito from "./views/Appointment/AgendamentoDebito";

import Metodo from "./views/Payment/Metodo";
import Card from "./views/Payment/Card";
import Process from "./views/Payment/Process";
import Boleto from "./views/Payment/Boleto";
import Sucesso from "./views/Payment/Sucesso";
import Retorno from "./views/Payment/Retorno";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />

      <Route path="/start" exact component={Start} />
      <Route path="/cadastro" exact component={Cadastro} />
      <Route path="/confirmacao" exact component={Confirmacao} />
      <PrivateRoute path="/perfil" exact component={Perfil} />
      <PrivateRoute path="/atualizar" exact component={Atualizar} />

      <PrivateRoute path="/tipo" exact component={Tipo} />
      <PrivateRoute path="/subtipo" exact component={Subtipo} />

      <PrivateRoute path="/regiao" exact component={Regiao} />
      <PrivateRoute path="/local" exact component={Local} />
      <PrivateRoute
        path="/agendamento-boleto"
        exact
        component={AgendamentoBoleto}
      />
      <PrivateRoute
        path="/agendamento-card"
        exact
        component={AgendamentoCard}
      />
      <PrivateRoute
        path="/agendamento-debito"
        exact
        component={AgendamentoDebito}
      />

      <PrivateRoute path="/metodo" exact component={Metodo} />
      <PrivateRoute path="/card" exact component={Card} />
      <PrivateRoute path="/process" exact component={Process} />
      <PrivateRoute path="/boleto" exact component={Boleto} />
      <PrivateRoute path="/sucesso" exact component={Sucesso} />
      <PrivateRoute path="/retorno" exact component={Retorno} />

      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </Router>
);

export default Routes;
