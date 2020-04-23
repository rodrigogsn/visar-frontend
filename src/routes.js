import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./views/Home";
const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </Router>
);

export default Routes;
