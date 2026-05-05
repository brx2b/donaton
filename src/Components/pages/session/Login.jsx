import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../App.css";
export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("token", "admin");
    navigate("/");
  };

  return (
    <>
      <div id="contenedor-login">
        <h1 className="titulo-form">Iniciar sesión</h1>
        <form id="formulario-login" onSubmit={handleSubmit}>
          <input type="text" placeholder="Usuario" />
          <input type="password" placeholder="Contraseña" />
          <button type="submit">Iniciar sesión</button>
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
