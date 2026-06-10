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
      console.log("NO LOGING");
      setIsLogged(false);
      setIsAdmin(false);
    } else {
      console.log("SI LOGIN");
      setIsLogged(true);
      const admin = localStorage.getItem("setAdmin");
      setIsAdmin(admin === "true");
    }
  }, [location]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("setAdmin");
    window.location.reload();
  };

  return (
    <>
      <div className="flex flex-wrap flex-row mb-5 border-b-2 border-black
        justify-between bg-[#9dbebb] text-3xl items-center p-4 gap-x-13 gap-y-5  
      ">
        <NavLink id="logoNav">
          <h1 id="logo" to="/">
            Donaton
          </h1>
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
          <section className="flex gap-x-13 m-5 bg-[##77aca2]" id="login">
          {isLogged ? (
            <button
              className="NavLink  "
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
