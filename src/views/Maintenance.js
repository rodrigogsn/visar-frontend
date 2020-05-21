import React from "react";

import manut from "./../assets/img/manut.jpg";

const Maintenance = () => {
  return (
    <>
      <main
        className="default"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <img src={manut} alt="" style={{ maxWidth: 600 }} />
      </main>
    </>
  );
};

export default Maintenance;
