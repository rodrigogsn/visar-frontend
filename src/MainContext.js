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

  address: "",
  setAddress: () => {},

  appointment: "",
  setAppointment: () => {},

  subtotal: "",
  setSubtotal: () => {},

  fullDay: "",
  setFullDay: () => {},

  boleto: "",
  setBoleto: () => {},

  eft: "",
  setEft: () => {},

  transaction: "",
  setTransaction: () => {},

  toastClosed: "",
  setToastClosed: () => {},
});

export default MainContext;
