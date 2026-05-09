import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../App.css";
import { validation } from "../../../utils/Validators.jsx";
import { useState } from "react";
export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log("llamando BFF: ", formData);
    validation({
      peticion: "manejarRegistro",
      datos: formData,
      navigate: navigate,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <div id="contenedor-register">
        <h1 className="titulo-form">Registrarse</h1>
        <form id="formulario-register" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            onChange={handleChange}
            required
            placeholder="Nombre"
          />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            required
            placeholder="Correo electrónico"
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
            placeholder="Contraseña"
          />
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            required
            placeholder="Confirmar contraseña"
          />
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
