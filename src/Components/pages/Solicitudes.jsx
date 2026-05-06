import "../../App.css";
export default function Solicitudes() {
  const session = localStorage.getItem("token");
  if (session == null) {
    return (
      <>
        <div>
          <h1>Inicia sesión para ver tus solicitudes</h1>
        </div>
        <div id="footer">
          <footer>
            <p>Sitio web desarrollado por brx2b</p>
          </footer>
        </div>
      </>
    );
  }

  const buscarSolicitudes = "";
  const solicitudesPendientes = [];

  const handleSolicitudes = () => {
    console.log("Cargando solicitudes");
    for (let i = 0; i < solicitudesPendientes.length; i++) {
      const solicitud = solicitudesPendientes[i];
    }
    console.log("solicitud cargadas");
  };
  return (
    <>
      <h1 id="headerSolicitudes">Solicitudes de ayuda humanitaria</h1>
      {/* pasar como prompts desde la base de datos informacion de las solicitudes en espera */}
      {/*  */}
      <div onClick={handleSolicitudes} id="ListaSolicitudes">
        <div className="contenedorSolicitud">
          <h5>Solicitud:</h5>
          <p id="descSolicitud"> </p>
          <h5>Sede:</h5>
          <p1 id="sedeSolicitud"> </p1>
          <h5>Realizado por:</h5>
          <button id="botonDetalles">Más detalles</button>
        </div>

        <div className="contenedorSolicitud">
          <h5>Solicitud:</h5>
          <p id="descSolicitud"> </p>
          <h5>Sede:</h5>
          <p1 id="sedeSolicitud"> </p1>
          <h5>Realizado por:</h5>
          <button id="botonDetalles">Más detalles</button>
        </div>

        <div className="contenedorSolicitud">
          <h5>Solicitud:</h5>
          <p id="descSolicitud"> </p>
          <h5>Sede:</h5>
          <p1 id="sedeSolicitud"> </p1>
          <h5>Realizado por:</h5>
          <button id="botonDetalles">Más detalles</button>
        </div>
      </div>
      <div id="footer">
        <footer>
          <p>Sitio web desarrollado por brx2b</p>
        </footer>
      </div>
    </>
  );
}
