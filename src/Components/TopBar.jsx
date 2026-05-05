import "../App.css";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
export default function TopBar() {
  const [isLogged, setIsLogged] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogged(Boolean(token));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <div id="TopBar">
        <h1 id="logo">Donaton</h1>
        <section id="opciones">
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
        </section>
        <section id="login">
          {isLogged ? (
            <button
              className="NavLink logout-button"
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
