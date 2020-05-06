import React from "react";

const MainContext = React.createContext({
  user: "",
  setUser: () => {},

  profile: "",
  setProfile: () => {},
});

export default MainContext;
