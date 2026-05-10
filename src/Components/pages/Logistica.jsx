import { useEffect, useState } from "react";

export default function Logistica() {
  const [envios, setEnvios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newEnvio, setNewEnvio] = useState({
    carga: [{ nombre: "", cantidad: "" }],
    chofer: "",
    destino: "",
    matricula: "",
    origen: ""
  });

  useEffect(() => {
    fetchEnvios();
  }, []);

  const fetchEnvios = async () => {
    try {
      const response = await fetch("/api/logistica", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este envío?")) return;
    try {
      const response = await fetch(`/api/logistica/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Error al eliminar envío");
      fetchEnvios(); // Refresh list
    } catch (err) {
      alert(err.message);
    }
  };

  const addItem = () => {
    setNewEnvio(prev => ({
      ...prev,
      carga: [...prev.carga, { nombre: "", cantidad: "" }]
    }));
  };

  const updateItem = (index, field, value) => {
    setNewEnvio(prev => ({
      ...prev,
      carga: prev.carga.map((item, i) => i === index ? { ...item, [field]: value } : item)
    }));
  };

  const removeItem = (index) => {
    setNewEnvio(prev => ({
      ...prev,
      carga: prev.carga.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ordenar carga alfabéticamente por nombre
    const sortedCarga = [...newEnvio.carga].sort((a, b) => a.nombre.localeCompare(b.nombre));
    const envioData = { ...newEnvio, carga: sortedCarga };
    try {
      const response = await fetch("/api/logistica", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(envioData),
      });
      if (!response.ok) throw new Error("Error al registrar envío");
      setNewEnvio({
        carga: [{ nombre: "", cantidad: "" }],
        chofer: "",
        destino: "",
        matricula: "",
        origen: ""
      });
      fetchEnvios(); // Refresh list
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Logística</h1>
      <div id="tarjeta-inicial" style={{ marginBottom: '5vh' }}>
        <h2>Registrar Nuevo Envío</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
          <div>
            <label>Carga:</label>
            {newEnvio.carga.map((item, index) => (
              <div key={index} style={{ display: 'flex', gap: '1vh', alignItems: 'center', marginBottom: '1vh' }}>
                <input
                  type="text"
                  placeholder="Nombre del item"
                  value={item.nombre}
                  onChange={(e) => updateItem(index, 'nombre', e.target.value)}
                  required
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  placeholder="Cantidad"
                  value={item.cantidad}
                  onChange={(e) => updateItem(index, 'cantidad', e.target.value)}
                  required
                  min="1"
                  style={{ width: '10vh' }}
                />
                {newEnvio.carga.length > 1 && (
                  <button type="button" onClick={() => removeItem(index)} style={{ background: 'red', color: 'white' }}>X</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addItem} style={{ marginTop: '1vh' }}>+ Añadir Item</button>
          </div>
          <div style={{ display: 'flex', gap: '2vh', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Chofer"
              value={newEnvio.chofer}
              onChange={(e) => setNewEnvio({ ...newEnvio, chofer: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Destino"
              value={newEnvio.destino}
              onChange={(e) => setNewEnvio({ ...newEnvio, destino: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Matrícula"
              value={newEnvio.matricula}
              onChange={(e) => setNewEnvio({ ...newEnvio, matricula: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Origen"
              value={newEnvio.origen}
              onChange={(e) => setNewEnvio({ ...newEnvio, origen: e.target.value })}
              required
            />
          </div>
          <button type="submit" style={{ alignSelf: 'flex-start', background: '#77aca2', color: 'white', padding: '1vh 2vh', border: 'none', cursor: 'pointer' }}>Registrar Envío</button>
        </form>
      </div>
      <h2>Envíos Registrados</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
        {envios.map((envio) => (
          <div key={envio.id} id="tarjeta-inicial" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>ID:</strong> {envio.id}<br />
              <strong>Carga:</strong> {envio.carga ? envio.carga.map(item => `${item.nombre} ${item.cantidad}`).join(', ') : 'N/A'}<br />
              <strong>Chofer:</strong> {envio.chofer || 'N/A'}<br />
              <strong>Destino:</strong> {envio.destino || 'N/A'}<br />
              <strong>Matrícula:</strong> {envio.matricula || 'N/A'}<br />
              <strong>Origen:</strong> {envio.origen || 'N/A'}
            </div>
            <button onClick={() => handleDelete(envio.id)} style={{ background: 'red', color: 'white', border: 'none', padding: '1vh', cursor: 'pointer' }}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
