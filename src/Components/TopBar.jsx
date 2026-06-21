import "../App.css";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
export default function TopBar() {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      setIsLogged(false);
      setIsAdmin(false);
    } else {
      setIsLogged(true);
      const admin = localStorage.getItem("setAdmin");
      setIsAdmin(admin === "true");
    }
  }, [location]);
  const handleLogout = async () => {
    try {
      // 1. Le avisamos al BFF que destruya la cookie HttpOnly
      await fetch("http://localhost:4000/api/usuarios/logout", {
        method: "POST",
        credentials: "include", // 🔥 CRUCIAL: Para que el BFF sepa qué cookie borrar
      });
    } catch (error) {
      console.error("Error al avisar del logout al servidor:", error);
    } finally {
      localStorage.removeItem("rol");
      localStorage.removeItem("setAdmin");
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.href = "/";
    }
  };

  return (
    <>
      <div
        className="flex flex-wrap flex-row mb-5 border-b-2 border-black
        justify-between bg-[#9dbebb] text-3xl items-center p-4 gap-x-13 gap-y-5  
      "
      >
        <NavLink id="logoNav">
          <h1 id="logo" to="/">
            Donaton
          </h1>
          {isAdmin && (
            <label className="text-black-50 ml-5">¡Admin activo!</label>
          )}
          {isLogged && !isAdmin && (
            <label className="text-black-50 ml-5">
              Iniciado como {localStorage.getItem("username")}{" "}
            </label>
          )}
        </NavLink>

        <NavLink className={"NavLink"} to="/">
          <label>Inicio</label>
        </NavLink>
        <NavLink className={"NavLink"} to="/Solicitudes">
          <label>Solicitudes</label>
        </NavLink>
        <NavLink className={"NavLink"} to="/Sedes">
          <label>Sedes</label>
        </NavLink>
        <NavLink className={"NavLink"} to="/Nosotros">
          <label>Nosotros</label>
        </NavLink>
        {isAdmin && (
          <>
            <NavLink className={"NavLink"} to="/Historial">
              <label>Historial</label>
            </NavLink>
            <NavLink className={"NavLink"} to="/Logistica">
              <label>Logistica</label>
            </NavLink>
          </>
        )}
        <section className="flex gap-x-13 pr-5 bg-[##77aca2]" id="login">
          {isLogged ? (
            <button
              className="border-b-7 border-transparent text-black-100 hover:text-red-400 transition-colors duration-100 hover:border-black "
              type="button"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          ) : (
            <>
              <NavLink className={"NavLink"} to="/Login">
                <label>Login</label>
              </NavLink>
              <NavLink className={"NavLink"} to="/Register">
                <label>Registro</label>
              </NavLink>
            </>
          )}
        </section>
      </div>
    </>
  );
}
