import { useState } from "react";
import "./App.css";
import "./Components/TopBar.jsx";
import TopBar from "./Components/TopBar.jsx";
import { Route, Routes } from "react-router-dom";
import Inicio from "./Components/Inicio.jsx";
import Solicitudes from "./Components/Solicitudes.jsx";
import Sedes from "./Components/Sedes.jsx";
import Nosotros from "./Components/Nosotros.jsx";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/solicitudes" element={<Solicitudes />} />
        <Route path="/Sedes" element={<Sedes />} />
        <Route path="/Nosotros" element={<Nosotros />} />
      </Routes>
    </>
  );
}
