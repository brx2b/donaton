import "../../App.css";
import { useState, useEffect } from "react";

export default function Solicitudes() {
  const session = localStorage.getItem("token");
  const [solicitudes, setSolicitudes] = useState([]);
  const [usuarios, setUsuarios] = useState({});
  const [mostrarCantidad, setMostrarCantidad] = useState(5);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      cargarSolicitudes();
    }
  }, [session]);

  const cargarSolicitudes = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/necesidades");
      const data = await response.json();
      if (response.ok) {
        setSolicitudes(data.data);
        // Obtener usuarios únicos
        const usuarioIds = [...new Set(data.data.map(s => s.usuarioId))];
        await cargarUsuarios(usuarioIds);
      } else {
        console.error("Error al cargar solicitudes:", data.error);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
    setLoading(false);
  };

  const cargarUsuarios = async (usuarioIds) => {
    const usuariosData = {};
    await Promise.all(
      usuarioIds.map(async (id) => {
        try {
          const response = await fetch(`http://localhost:4000/api/usuarios/${id}`);
          const data = await response.json();
          if (response.ok) {
            usuariosData[id] = data.data;
          }
        } catch (error) {
          console.error(`Error al cargar usuario ${id}:`, error);
        }
      })
    );
    setUsuarios(usuariosData);
  };

  const cargarMas = () => {
    setMostrarCantidad((prev) => prev + 5);
  };

  if (session == null) {
    return (
      <>
        <div>
          <h1 id="contenedor-iniciar">
            Inicia sesión para ver tus solicitudes
          </h1>
        </div>
        <div id="footer">
          <footer>
            <p>Sitio web desarrollado por brx2b</p>
          </footer>
        </div>
      </>
    );
  }

  const solicitudesAMostrar = solicitudes.slice(0, mostrarCantidad);

  return (
    <>
      <h1 id="headerSolicitudes">Solicitudes de ayuda humanitaria</h1>
      {loading && <p>Cargando solicitudes...</p>}
      <div id="ListaSolicitudes">
        {solicitudesAMostrar.map((solicitud, index) => {
          const usuario = usuarios[solicitud.usuarioId];
          return (
            <div key={solicitud.id || index} className="contenedorSolicitud">
              <h5>Solicitud:</h5>
              <p id="descSolicitud">{solicitud.desc}</p>
              <h5>Sede:</h5>
              <p id="sedeSolicitud">{solicitud.sede}</p>
              <h5>Realizado por:</h5>
              <p>
                {usuario ? `${usuario.nombre} (${usuario.email})` : 'Cargando...'}
              </p>
              <button id="botonDetalles">Más detalles</button>
            </div>
          );
        })}
      </div>
      {solicitudes.length > mostrarCantidad && (
        <button onClick={cargarMas} id="botonCargarMas">
          Cargar más
        </button>
      )}
      <div id="footer">
        <footer>
          <p>Sitio web desarrollado por brx2b</p>
        </footer>
      </div>
    </>
  );
}
