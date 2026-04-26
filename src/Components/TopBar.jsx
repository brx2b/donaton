import "../App.css";
export default function TopBar() {
  return (
    <>
      <div id="TopBar">
        <h1 id="logo">Donaton</h1>
        <section id="opciones">
          <label>Inicio</label>
          <label>Solicitudes</label>
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
