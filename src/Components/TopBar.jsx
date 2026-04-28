import "../App.css";
import { NavLink } from "react-router-dom";
export default function TopBar() {
  return (
    <>
      <div id="TopBar">
        <h1 id="logo">Donaton</h1>
        <section id="opciones">
          <NavLink to="/Inicio">
            <label>Inicio</label>
          </NavLink>
          <NavLink to="/solicitudes">
            <label>Solicitudes</label>
          </NavLink>
          <label>Sedes</label>
          <label>Nosotros</label>
        </section>
        <section id="login">
          <label>Login</label>
          <label>Registro</label>
        </section>
      </div>
    </>
  );
}
