import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../App.css";
import { validation } from "../../../utils/Validators.jsx";
import { useState } from "react";
export default function Login() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    console.log("llamando BFF: ");
    validation({
      peticion: "manejarLogin",
      datos: formData,
      navigate: navigate,
      setAdmin,
      setError: setErrorMessage,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <div id="contenedor-login">
        <h1 className="titulo-form">Iniciar sesión</h1>
        <form id="formulario-login" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            onChange={handleChange}
            required
            placeholder="Usuario"
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
            placeholder="Contraseña"
          />
          <button type="submit">Iniciar sesión</button>
          {errorMessage && <p className="form-error">{errorMessage}</p>}
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
