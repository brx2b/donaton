import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../App.css";
export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("token", "admin");
    navigate("/");
  };

  return (
    <>
      <div id="contenedor-register">
        <h1 className="titulo-form">Registrarse</h1>
        <form id="formulario-register" onSubmit={handleSubmit}>
          <input type="text" placeholder="Nombre" />
          <input type="email" placeholder="Correo electrónico" />
          <input type="password" placeholder="Contraseña" />
          <input type="password" placeholder="Confirmar contraseña" />
          <button type="submit">Registrarse</button>
        </form>
      </div>
      <div id="footer">
        <footer>
          <p>Sitio web desarrollado por brx2b</p>
        </footer>
      </div>
    </>
  );
}
