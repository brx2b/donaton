import "../../App.css";
import { useState, useEffect } from "react";
import { validation, URL_BFF } from "../../utils/Validators";
import { BarLoader } from "react-spinners";
export default function Solicitudes() {
  const session = localStorage.getItem("token");
  const [solicitudes, setSolicitudes] = useState([]);
  const [usuarios, setUsuarios] = useState({});
  const [mostrarCantidad, setMostrarCantidad] = useState(5);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [monto, setMonto] = useState(0);
  const [tipo, setTipo] = useState("individual");
  const [donacionStatus, setDonacionStatus] = useState(null);
  const [error, setError] = useState(null);

  const [errorCarga, setErrorCarga] = useState(false);

  useEffect(() => {
    if (session) {
      cargarSolicitudes();
    }
  }, [session]);

  const cargarSolicitudes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/necesidades`);
      const data = await response.json();

      if (response.ok) {
        setSolicitudes(data.data || []);
        const usuarioIds = [...new Set(data.data.map((s) => s.usuarioId))];
        await cargarUsuarios(usuarioIds);
      } else {
        console.error("Error al cargar solicitudes:", data);
        alert("Error del servidor: " + (data.error || "Desconocido"));
        setErrorCarga(true);
      }
    } catch (error) {
      console.error("Error de conexión:", error);

      setErrorCarga(true);
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
    setTipo("individual");
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
    if (tipo === "empresa" && montoNumero <= 10000) {
      setError("Las donaciones de empresa deben ser superiores a $10.000.");
      return;
    }
    if (tipo === "individual" && montoNumero <= 1000) {
      setError("Las donaciones individuales deben ser superiores a $1.000.");
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
            tipo: tipo.toUpperCase(),
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

  const handleDeleteSolicitud = async (id) => {
    if (!confirm("¿Estás seguro de eliminar esta solicitud?")) return;
    try {
      const response = await fetch(
        `http://localhost:4000/api/necesidades/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (!response.ok) throw new Error("Error al eliminar solicitud");
      cargarSolicitudes(); // Refresh list
    } catch (err) {
      alert(err.message);
    }
  };

  const isAdmin = localStorage.getItem("setAdmin") === "true";

  if (session == null) {
    return (
      <>
        <div>
          <h1 id="contenedor-iniciar">Inicia sesión para ver solicitudes</h1>
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
      {loading && (
        <>
          <div className="cargandoScreen">
            <h1>Cargando...</h1>
            <BarLoader height={10} width={400} />
          </div>
          <div id="footer">
            <footer>
              <p>Sitio web desarrollado por brx2b</p>
            </footer>
          </div>
        </>
      )}
      {errorCarga && (
        <>
          <div className="cargandoScreen">
            <h1>Error al cargar, Verifica la conexión del servidor</h1>
          </div>
          <div id="footer">
            <footer>
              <p>Sitio web desarrollado por brx2b</p>
            </footer>
          </div>
        </>
      )}

      {solicitudesAMostrar.map((solicitud, index) => {
        const usuario = usuarios[solicitud.usuarioId];
        return (
          <>
            <h1 id="headerSolicitudes">Solicitudes de ayuda humanitaria</h1>
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
              {isAdmin && (
                <button
                  onClick={() => handleDeleteSolicitud(solicitud.id)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "0.5vh 1vh",
                    marginLeft: "1vh",
                    cursor: "pointer",
                  }}
                >
                  Eliminar
                </button>
              )}
            </div>
            <div id="footer">
              <footer>
                <p>Sitio web desarrollado por brx2b</p>
              </footer>
            </div>
          </>
        );
      })}
      {solicitudes.length > mostrarCantidad && (
        <button onClick={cargarMas} id="botonCargarMas">
          Cargar más
        </button>
      )}

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
          <label htmlFor="tipoDonacion">Tipo de donación</label>
          <select
            id="tipoDonacion"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          >
            <option value="individual">Individual</option>
            <option value="empresa">Empresa</option>
          </select>
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
            Nota: Las donaciones individuales deben ser superiores a $1.000. Las
            donaciones de empresa deben ser superiores a $10.000.
          </p>
        </div>
      </div>
    </>
  );
}
