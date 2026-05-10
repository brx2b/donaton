import { useState } from "react";
import "./App.css";
import "./Components/TopBar.jsx";
import TopBar from "./Components/TopBar.jsx";
import { Route, Routes } from "react-router-dom";
import Inicio from "./Components/pages/Inicio.jsx";
import Solicitudes from "./Components/pages/Solicitudes.jsx";
import Sedes from "./Components/pages/Sedes.jsx";
import Nosotros from "./Components/pages/Nosotros.jsx";
import Login from "./Components/pages/session/Login.jsx";
import Register from "./Components/pages/session/Register.jsx";
import Historial from "./Components/pages/Historial.jsx";
import Logistica from "./Components/pages/Logistica.jsx";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/solicitudes" element={<Solicitudes />} />
        <Route path="/Sedes" element={<Sedes />} />
        <Route path="/Nosotros" element={<Nosotros />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Historial" element={<Historial />} />
        <Route path="/Logistica" element={<Logistica />} />
      </Routes>
    </>
  );
}
