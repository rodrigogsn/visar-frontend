import React, { useState } from "react";
import Routes from "./routes";
import GlobalStyle from "./styles/Global";
import MainContext from "./MainContext";
import LoadLibrary from "./utils/LoadLibrary";

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
  const [fullDay, setFullDay] = useState(false);
  const [boleto, setBoleto] = useState("");
  const [eft, setEft] = useState("");
  const [transaction, setTransaction] = useState("");

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
    fullDay,
    setFullDay,
    boleto,
    setBoleto,
    eft,
    setEft,
    transaction,
    setTransaction,
  };

  return (
    <LoadLibrary>
      <MainContext.Provider value={value}>
        <GlobalStyle />
        <Routes />
      </MainContext.Provider>
    </LoadLibrary>
  );
};

export default App;
