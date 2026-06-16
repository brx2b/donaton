import { useEffect, useState } from "react";
import "../../App.css";
import { validation, URL_BFF } from "../../utils/Validators.jsx";
import { BarLoader } from "react-spinners";
const sortCarga = (carga) => {
  return [...carga].sort((a, b) => {
    const nameA = a.nombre?.trim().toLowerCase() || "~";
    const nameB = b.nombre?.trim().toLowerCase() || "~";
    return nameA.localeCompare(nameB);
  });
};

export default function Logistica() {
  const [envios, setEnvios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newEnvio, setNewEnvio] = useState({
    carga: [{ nombre: "", cantidad: "" }],
    chofer: "",
    destino: "",
    matricula: "",
    origen: "",
  });

  useEffect(() => {
    fetchEnvios();
  }, []);

  const fetchEnvios = async () => {
    try {
      const token = localStorage.getItem("token");
      const isAdmin = localStorage.getItem("setAdmin") === "true";
      if (isAdmin == false || token == null) {
        setError("No tienes permiso para ver esta página");
        return;
      }

      const response = await fetch(`${URL_BFF}/api/logistica`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Error al obtener envíos");
      const data = await response.json();
      setEnvios(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (envio) => {
    if (!confirm("¿Estás seguro de eliminar este envío? " + envio.matricula))
      return;
    console.log(
      "Eliminando envío con matrícula:",
      envio.matricula + " " + typeof envio.matricula,
    ); // Debug
    try {
      const response = await fetch(
        `http://localhost:4000/api/logistica/${envio.id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) throw new Error("Error al eliminar envío");
      alert("Envío eliminado ☼");
      fetchEnvios(); // Refresh list
    } catch (err) {
      alert(err.message);
    }
  };

  const updateCarga = (index, field, value) => {
    setNewEnvio((prev) => {
      const carga = prev.carga.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item,
      );
      return { ...prev, carga: sortCarga(carga) };
    });
  };

  const addItem = () => {
    setNewEnvio((prev) => ({
      ...prev,
      carga: sortCarga([...prev.carga, { nombre: "", cantidad: "" }]),
    }));
  };

  const removeItem = (index) => {
    setNewEnvio((prev) => ({
      ...prev,
      carga: prev.carga.filter((_, idx) => idx !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const envioPayload = {
      ...newEnvio,
      carga: sortCarga(newEnvio.carga),
    };

    // Usamos validation como en el resto de la aplicación
    validation({
      peticion: "manejarLogistica",
      datos: envioPayload, // ← los datos del formulario
      setNewEnvio: setNewEnvio, // ← para limpiar el formulario
      setEnvios: setEnvios, // ← para recargar la lista
    });
  };

  if (loading)
    return (
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
    );
  if (error)
    return (
      <>
        <div className="cargandoScreen">
          <h1>{error}</h1>
        </div>
        <div id="footer">
          <footer>
            <p>Sitio web desarrollado por brx2b</p>
          </footer>
        </div>
      </>
    );

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="bg-white px-15 border-b-2">Logística</h1>
        <div className="bg-white p-20 px-40 border-2">
          <h2>Registrar envío</h2>
          <form onSubmit={handleSubmit} className="logistica-form-grid">
            <div className="logistica-section">
              <label className="logistica-label">Carga</label>
              {newEnvio.carga.map((item, index) => (
                <div key={index} className="logistica-item-row">
                  <input
                    type="text"
                    placeholder="Nombre item"
                    value={item.nombre}
                    onChange={(e) =>
                      updateCarga(index, "nombre", e.target.value)
                    }
                    required
                    className="logistica-input"
                  />
                  <input
                    type="number"
                    placeholder="Cantidad"
                    value={item.cantidad}
                    min="1"
                    onChange={(e) =>
                      updateCarga(index, "cantidad", e.target.value)
                    }
                    required
                    className="logistica-input logistica-input-small"
                  />
                  {newEnvio.carga.length > 1 && (
                    <button
                      type="button"
                      className="logistica-remove"
                      onClick={() => removeItem(index)}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="logistica-add-item"
                onClick={addItem}
              >
                + Añadir item
              </button>
            </div>

            <div className="logistica-section logistica-fieldset">
              <label className="logistica-label">Chofer</label>
              <input
                type="text"
                value={newEnvio.chofer}
                onChange={(e) =>
                  setNewEnvio({ ...newEnvio, chofer: e.target.value })
                }
                required
                className="logistica-input"
              />
              <label className="logistica-label">Destino</label>
              <input
                type="text"
                value={newEnvio.destino}
                onChange={(e) =>
                  setNewEnvio({ ...newEnvio, destino: e.target.value })
                }
                required
                className="logistica-input"
              />
              <label className="logistica-label">Matrícula</label>
              <input
                type="text"
                value={newEnvio.matricula}
                onChange={(e) =>
                  setNewEnvio({ ...newEnvio, matricula: e.target.value })
                }
                required
                className="logistica-input"
              />
              <label className="logistica-label">Origen</label>
              <input
                type="text"
                value={newEnvio.origen}
                onChange={(e) =>
                  setNewEnvio({ ...newEnvio, origen: e.target.value })
                }
                required
                className="logistica-input"
              />
              <button type="submit" className="logistica-button">
                Registrar envío
              </button>
            </div>
          </form>
        </div>

        <div className="logistica-list">
          {envios.map((envio) => (
            <div
              key={envio.matricula || envio.id}
              id="tarjeta-inicial"
              className="logistica-card"
            >
              <div>
                <p>
                  <strong>Chofer:</strong> {envio.chofer || "N/A"}
                </p>
                <p>
                  <strong>Destino:</strong> {envio.destino || "N/A"}
                </p>
                <p>
                  <strong>Matrícula:</strong> {envio.matricula || "N/A"}
                </p>
                <p>
                  <strong>Origen:</strong> {envio.origen || "N/A"}
                </p>
                <p>
                  <strong>Carga:</strong>{" "}
                  {envio.carga
                    ? envio.carga
                        .map((item) => `${item.nombre} ${item.cantidad}`)
                        .join(", ")
                    : "N/A"}
                </p>
              </div>
              <button
                className="logistica-button logistica-delete"
                onClick={() => handleDelete(envio)}
              >
                Eliminar
              </button>
            </div>
          ))}
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
