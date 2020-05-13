import React, { useState } from "react";
import Routes from "./routes";
import GlobalStyle from "./styles/Global";
import MainContext from "./MainContext";

const App = () => {
  const [user, setUser] = useState("");
  const [profile, setProfile] = useState(false);
  const [method, setMethod] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [location, setLocation] = useState("");
  const [spot, setSpot] = useState("");
  const [appointment, setAppointment] = useState("");
  const [subtotal, setSubtotal] = useState(0);

  const value = {
    user,
    setUser,
    profile,
    setProfile,
    method,
    setMethod,
    category,
    setCategory,
    subcategory,
    setSubcategory,
    location,
    setLocation,
    spot,
    setSpot,
    appointment,
    setAppointment,
    subtotal,
    setSubtotal,
  };

  return (
    <MainContext.Provider value={value}>
      <GlobalStyle />
      <Routes />
    </MainContext.Provider>
  );
};

export default App;
