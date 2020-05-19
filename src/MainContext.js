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

  subtotal: "",
  setSubtotal: () => {},

  fullDay: "",
  setFullDay: () => {},

  boleto: "",
  setBoleto: () => {},

  transaction: "",
  setTransaction: () => {},
});

export default MainContext;
