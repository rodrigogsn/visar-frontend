import React from "react";

const MainContext = React.createContext({
  user: "",
  setUser: () => {},

  profile: "",
  setProfile: () => {},

  method: "",
  setMethod: () => {},

  category: "",
  setCategory: () => {},

  subcategory: "",
  setSubcategory: () => {},

  location: "",
  setLocation: () => {},

  spot: "",
  setSpot: () => {},

  appointment: "",
  setAppointment: () => {},

  total: "",
  setTotal: () => {},
});

export default MainContext;
