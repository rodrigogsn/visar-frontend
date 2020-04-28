import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./views/Home";
import Login from "./views/Login";

import Start from "./views/SignUp/Start";
import Cadastro from "./views/SignUp/Cadastro";
import Confirmacao from "./views/SignUp/Confirmacao";
import Perfil from "./views/SignUp/Perfil";
import Atualizar from "./views/SignUp/Atualizar";

import Tipo from "./views/Vehicle/Tipo";
import Subtipo from "./views/Vehicle/Subtipo";

import Spot from "./views/Appointment/Spot";
import Agendamento from "./views/Appointment/Agendamento";

import Metodo from "./views/Payment/Metodo";
import Card from "./views/Payment/Card";
import Revisao from "./views/Payment/Revisao";
import Sucesso from "./views/Payment/Sucesso";

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />

      <Route path="/start" exact component={Start} />
      <Route path="/cadastro" exact component={Cadastro} />
      <Route path="/confirmacao" exact component={Confirmacao} />
      <Route path="/perfil" exact component={Perfil} />
      <Route path="/atualizar" exact component={Atualizar} />

      <Route path="/tipo" exact component={Tipo} />
      <Route path="/subtipo" exact component={Subtipo} />

      <Route path="/spot" exact component={Spot} />
      <Route path="/agendamento" exact component={Agendamento} />

      <Route path="/metodo" exact component={Metodo} />
      <Route path="/card" exact component={Card} />
      <Route path="/revisao" exact component={Revisao} />
      <Route path="/sucesso" exact component={Sucesso} />

      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </Router>
);

export default Routes;
