import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function validation({ peticion, datos, navigate, setAdmin }) {
  //url cambiar segpun entorno
  const URL_BFF = "http://localhost:4000";

  if (peticion === "manejarRegistro") {
    console.log("Validando datos, espera V");
    const ejecutarRegistro = async (datosDelForm) => {
      try {
        const respuesta = await fetch(`${URL_BFF}/api/usuarios/nuevoUsuario`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosDelForm),
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
          console.log("Registro correcto!");
          // Redirigir al login o limpiar formulario
          navigate("/");
        } else {
          alert("Error: " + resultado.error);
        }
      } catch (error) {
        console.error("Error de conexión con el BFF");
      }
    };
    ejecutarRegistro(datos);
  } else if (peticion === "manejarLogin") {
    console.log("Validando datos LOGIN: ");
    const manejarLogin = async (datosDelForm) => {
      try {
        const respuesta = await fetch(`${URL_BFF}/api/usuarios/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosDelForm),
        });
        console.log("Obteniendo resultado");
        const resultado = await respuesta.json();
        if (respuesta.ok) {
          console.log("Login correcto!");
          const token = resultado.data;
          if (token.rol == "admin") {
            localStorage.setItem("token", "adm" + token.id);
            setAdmin(true);
            alert("Iniciando como admin!");
          } else {
            localStorage.setItem("token", "usr" + token.id);
            console.log(localStorage.getItem("token"));
            alert("Bienvenido!");
          }

          navigate("/"); // Redirigir a la página principal después del login
        } else {
          console.error("Error en login", resultado.error);
        }
      } catch (error) {
        console.log("Error de conexion con BFF: ", error);
      }
    };
    manejarLogin(datos);
  }
}
