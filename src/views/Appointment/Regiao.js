// import React, { useState, useContext, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import Header from "./../../components/Header";
// import Footer from "./../../components/Footer";
// import { Title, Paragraph } from "./../../components/Elements";
// import { _regiao } from "./../../views/content";

// import api from "./../../services/api";
// import MainContext from "./../../MainContext";

// const Regiao = () => {
//   let history = useHistory();

//   const { profile, setLocation } = useContext(MainContext);

//   const [locations, setLocations] = useState("");

//   const handleLocations = async () => {
//     await api
//       .get("/locations")
//       .then((response) => {
//         const data = response.data.map((location) => (
//           <span
//             className="buttonWide-container"
//             onClick={() => {
//               handleClick(location);
//             }}
//             key={location.id}
//           >
//             <div className="buttonWide customHeight">
//               <h2>{location.name}</h2>
//             </div>
//           </span>
//         ));

//         setLocations(data);
//       })
//       .catch((error) => {
//         console.log(error.response);
//       });
//   };

//   const handleClick = (location) => {
//     setLocation(location);
//     history.push("/local");
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);

//     if (!profile) {
//       history.push("/");
//     }

//     handleLocations();
//   }, []);

//   return (
//     <>
//       <Header />

//       <main className="default">
//         <header>
//           <Title text={_regiao.title} />
//           <Paragraph text={_regiao.paragraph} />
//         </header>

//         <div className="buttonGroup">
//           {locations}
//           <span className="buttonWide-container">
//             <div className="buttonWide customHeight disabled">
//               <h2>Outras Regiões</h2>
//               <p>(Em breve)</p>
//             </div>
//           </span>
//         </div>
//       </main>

//       <Footer />
//     </>
//   );
// };

// export default Regiao;
