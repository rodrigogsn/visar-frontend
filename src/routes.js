import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { isAuthenticated, isAdmin } from "./services/auth";

import Home from "./views/Home";
import Login from "./views/Login";
// import AdminLogin from "./views/Admin/AdminLogin";
// import Dashboard from "./views/Admin/Dashboard";

import Confirm from "./views/ConfirmEmail/Confirm";
import Reconfirm from "./views/ConfirmEmail/Reconfirm";

import Start from "./views/SignUp/Start";
import Cadastro from "./views/SignUp/Cadastro";
import Perfil from "./views/SignUp/Perfil";
import Atualizar from "./views/SignUp/Atualizar";

import EnviarLink from "./views/ResetPassword/EnviarLink";
import Reset from "./views/ResetPassword/Reset";

import Tipo from "./views/Vehicle/Tipo";
import Subtipo from "./views/Vehicle/Subtipo";

import Regiao from "./views/Appointment/Regiao";
import ConfirmarEndereco from "./views/Appointment/ConfirmarEndereco";
import AtualizarEndereco from "./views/Appointment/AtualizarEndereco";
import Local from "./views/Appointment/Local";
import AgendamentoBoleto from "./views/Appointment/AgendamentoBoleto";
import AgendamentoCard from "./views/Appointment/AgendamentoCard";
import AgendamentoDebito from "./views/Appointment/AgendamentoDebito";

import Metodo from "./views/Payment/Metodo";
import Process from "./views/Payment/Process";
import Boleto from "./views/Payment/Boleto";
import Debito from "./views/Payment/Debito";
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

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAdmin() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/admin", state: { from: props.location } }}
        />
      )
    }
  />
);

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/confirm" exact component={Confirm} />
      <Route path="/reconfirm" exact component={Reconfirm} />
      <Route path="/senha" exact component={EnviarLink} />
      <Route path="/reset" exact component={Reset} />
      <Route path="/start" exact component={Start} />
      <Route path="/cadastro" exact component={Cadastro} />
      <PrivateRoute path="/perfil" exact component={Perfil} />
      <PrivateRoute path="/atualizar" exact component={Atualizar} />
      <PrivateRoute path="/tipo" exact component={Tipo} />
      <PrivateRoute path="/subtipo" exact component={Subtipo} />
      <PrivateRoute path="/regiao" exact component={Regiao} />
      <PrivateRoute
        path="/confirmar-endereco"
        exact
        component={ConfirmarEndereco}
      />
      <PrivateRoute
        path="/atualizar-endereco"
        exact
        component={AtualizarEndereco}
      />
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
      <PrivateRoute path="/process" exact component={Process} />
      <PrivateRoute path="/boleto" exact component={Boleto} />
      <PrivateRoute path="/debito" exact component={Debito} />
      <PrivateRoute path="/sucesso" exact component={Sucesso} />
      <PrivateRoute path="/retorno" exact component={Retorno} />

      {/* Admin Routes */}
      {/* <Route path="/admin" exact component={AdminLogin} />
      <Route path="/dashboard" exact component={Dashboard} /> */}

      {/* 404 */}
      <Route path="*" component={() => <h1>Página não encontrada!</h1>} />
    </Switch>
  </Router>
);

export default Routes;
