import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Title, Paragraph } from "./../../components/Elements";
import { _regiao } from "./../../views/content";

import api from "./../../services/api";
import MainContext from "./../../MainContext";

const Dashboard = () => {
  const history = useHistory();

  useEffect(() => {}, []);

  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
};

export default Dashboard;
