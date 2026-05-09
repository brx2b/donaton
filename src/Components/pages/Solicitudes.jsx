import "../../App.css";
import { useState, useEffect } from "react";

export default function Solicitudes() {
  const session = localStorage.getItem("token");
  const [solicitudes, setSolicitudes] = useState([]);
  const [usuarios, setUsuarios] = useState({});
  const [mostrarCantidad, setMostrarCantidad] = useState(5);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [monto, setMonto] = useState(0);
  const [donacionStatus, setDonacionStatus] = useState(null);
  const [error, setError] = useState(null);

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
        const usuarioIds = [...new Set(data.data.map((s) => s.usuarioId))];
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
          const response = await fetch(
            `http://localhost:4000/api/usuarios/${id}`,
          );
          const data = await response.json();
          if (response.ok) {
            usuariosData[id] = data.data;
          }
        } catch (error) {
          console.error(`Error al cargar usuario ${id}:`, error);
        }
      }),
    );
    setUsuarios(usuariosData);
  };

  const abrirDrawer = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setMonto(1500);
    setDonacionStatus(null);
    setError(null);
    setDrawerOpen(true);
  };

  const cerrarDrawer = () => {
    setDrawerOpen(false);
    setSelectedSolicitud(null);
    setMonto(0);
    setError(null);
    setDonacionStatus(null);
  };

  const confirmarDonacion = async () => {
    setError(null);
    setDonacionStatus(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Debe iniciar sesión para donar");
      return;
    }

    const usuarioId = token.replace(/^usr/, "");
    const montoNumero = Number(monto);
    if (!montoNumero || montoNumero <= 0) {
      setError("Ingrese un monto válido mayor a 0");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:4000/api/donaciones/donar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuarioId,
            monto: montoNumero,
            fecha: new Date().toISOString().slice(0, 10),
            tipo: "INDIVIDUAL",
          }),
        },
      );
      const data = await response.json();
      if (response.ok) {
        setDonacionStatus("Donación registrada correctamente.");
        setTimeout(() => {
          cerrarDrawer();
          cargarSolicitudes();
        }, 1600);
      } else {
        setError(data.error || data || "No se pudo procesar la donación");
      }
    } catch (error) {
      console.error("Error al registrar donación:", error);
      setError("Error de conexión con el BFF");
    }
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
      {loading && <p id="cargando">Cargando solicitudes...</p>}
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
                {usuario
                  ? `${usuario.nombre} (${usuario.email})`
                  : "Cargando..."}
              </p>
              <button id="botonDetalles" onClick={() => abrirDrawer(solicitud)}>
                Donar
              </button>
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

      <div className={`drawer ${drawerOpen ? "open" : ""}`}>
        <div className="drawer-content">
          <button className="drawer-close" onClick={cerrarDrawer}>
            ×
          </button>
          <h2>Donar a esta solicitud</h2>
          {selectedSolicitud && (
            <>
              <p>
                <strong>Solicitud:</strong> {selectedSolicitud.desc}
              </p>
              <p>
                <strong>Sede:</strong> {selectedSolicitud.sede}
              </p>
              <p>
                <strong>Solicitante:</strong>{" "}
                {usuarios[selectedSolicitud.usuarioId]
                  ? `${usuarios[selectedSolicitud.usuarioId].nombre}`
                  : "Cargando..."}
              </p>
            </>
          )}
          <label htmlFor="montoDonacion">Monto a donar ($)</label>
          <input
            id="montoDonacion"
            type="number"
            min="1"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
          />
          <button className="drawer-action" onClick={confirmarDonacion}>
            Confirmar donación
          </button>
          {donacionStatus && <p className="drawer-success">{donacionStatus}</p>}
          {error && <p className="drawer-error">{error}</p>}
          <p className="drawer-note">
            Nota: para este sistema, las donaciones individuales deben ser
            superiores a $1.000.
          </p>
        </div>
      </div>
    </>
  );
}
