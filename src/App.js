import React, { useState } from "react";
import Routes from "./routes";
import GlobalStyle from "./styles/Global";
import MainContext from "./MainContext";

const App = () => {
  const [user, setUser] = useState("");
  const [profile, setProfile] = useState(false);

  const value = {
    user,
    setUser,
    profile,
    setProfile,
  };

  return (
    <MainContext.Provider value={value}>
      <GlobalStyle />
      <Routes />
    </MainContext.Provider>
  );
};

export default App;
