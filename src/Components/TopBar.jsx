import "../App.css";
import { NavLink } from "react-router-dom";
export default function TopBar() {
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
          <NavLink className={"NavLink"} to="/Login">
            <label>Login</label>
          </NavLink>
          <NavLink className={"NavLink"} to="/Register">
            <label>Registro</label>
          </NavLink>
        </section>
      </div>
    </>
  );
}
