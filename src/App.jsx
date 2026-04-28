import { useState } from "react";
import "./App.css";
import "./Components/TopBar.jsx";
import TopBar from "./Components/TopBar.jsx";
import { Route, Routes } from "react-router-dom";
import Inicio from "./Components/Inicio.jsx";
import Solicitudes from "./Components/Solicitudes.jsx";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/solicitudes" element={<Solicitudes />} />
      </Routes>
    </>
  );
}
