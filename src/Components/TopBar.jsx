import "../App.css";
import { NavLink } from "react-router-dom";
export default function TopBar() {
  return (
    <>
      <div id="TopBar">
        <h1 id="logo">Donaton</h1>
        <section id="opciones">
          <NavLink className={"NavLink"} to="/Inicio">
            <label>Inicio</label>
          </NavLink>
          <NavLink className={"NavLink"} to="/solicitudes">
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
          <label>Login</label>
          <label>Registro</label>
        </section>
      </div>
    </>
  );
}
