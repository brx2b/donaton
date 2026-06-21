import { useEffect, useState } from "react";
import "../../App.css";
import { URL_BFF } from "../../utils/Validators.jsx";
import { BarLoader } from "react-spinners";
export default function Historial() {
  const [donaciones, setDonaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDonaciones();
  }, []);

  const fetchDonaciones = async () => {
    try {
      const token = localStorage.getItem("token");
      const isAdmin = localStorage.getItem("setAdmin") === "true";
      if (isAdmin == false && token == null) {
        setError("No tienes permiso para ver esta página");
        return;
      }
      const response = await fetch(`${URL_BFF}/api/donaciones`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Error al obtener donaciones");
      const data = await response.json();
      setDonaciones(data.data || []);
    } catch (err) {
      setError("Verifica la conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (localStorage.getItem("setAdmin") !== "true") {
      alert();
    }
    if (!confirm("¿Estás seguro de eliminar esta donación?")) return;
    try {
      const response = await fetch(`${URL_BFF}/api/donaciones/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Error al eliminar donación");
      fetchDonaciones(); // actualizar
    } catch (err) {
      alert(err.message);
    }
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
        <h1 className="text-center bg-white px-15 border-b-2 ">
          Historial de Donaciones
        </h1>
        <div className="justify-center flex flex-row gap-2 flex-wrap">
          {donaciones.map((donacion) => (
            <div
              key={donacion.id}
              id="tarjeta-inicial"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h4>Fecha:</h4> {donacion.fecha}
                <br />
                <h4>Monto:</h4> ${donacion.monto}
                <br />
                <h4>Tipo:</h4> {donacion.tipo}
                <br />
                <h4>Usuario id:</h4> {donacion.usuarioId}
              </div>
              <button
                onClick={() => handleDelete(donacion.id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "1vh",
                  cursor: "pointer",
                }}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
      <footer id="footer">
        <p>Sitio web desarrollado por brx2b</p>
      </footer>
    </>
  );
}
