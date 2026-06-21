import { useNavigate } from "react-router-dom";

export const URL_BFF = "http://13.222.223.222:4000";

export function validation({
  peticion,
  datos,
  navigate,
  setAdmin,
  setError,
  setDonacionStatus,
  setEnvios,
  setNewEnvio,
}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
  };
  if (token && peticion !== "manejarLogin" && peticion !== "manejarRegistro") {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    headers,
    credentials: "include",
  };

  // ====================== REGISTRO ======================
  if (peticion === "manejarRegistro") {
    const ejecutarRegistro = async () => {
      try {
        const respuesta = await fetch(`${URL_BFF}/api/usuarios/nuevoUsuario`, {
          method: "POST",
          ...config,
          body: JSON.stringify(datos),
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
          if (setError) setError("");
          alert("Registro exitoso!");
          navigate("/");
        } else {
          const mensaje = resultado.error || "Error en el registro";
          if (setError) setError(mensaje);
          else alert(mensaje);
        }
      } catch (error) {
        console.error(error);
        if (setError) setError("Error de conexión con el servidor");
        else alert("Error de conexión con el servidor");
      }
    };
    ejecutarRegistro();
  }

  // ====================== LOGIN ======================
  else if (peticion === "manejarLogin") {
    const manejarLogin = async () => {
      try {
        const respuesta = await fetch(`${URL_BFF}/api/usuarios/login`, {
          method: "POST",
          ...config,
          body: JSON.stringify(datos),
        });

        const resultado = await respuesta.json();
        console.log(resultado);
        if (respuesta.ok) {
          if (setError) setError("");
          const tokenData = resultado.data;
          const isAdmin = tokenData.rol === "admin";

          localStorage.setItem("userId", tokenData.id);
          localStorage.setItem("token", tokenData.token);
          localStorage.setItem("rol", tokenData.rol || "usuario");
          localStorage.setItem(
            "username",
            tokenData.nombre || tokenData.usuario,
          );
          localStorage.setItem("setAdmin", isAdmin ? "true" : "false");

          setAdmin(isAdmin);

          alert(isAdmin ? "Iniciando como admin!" : "Bienvenido!");
          navigate("/");
        } else {
          const mensaje = resultado.error || "Usuario/Contraseña incorrecta";
          if (setError) setError(mensaje);
          else alert(mensaje);
        }
      } catch (error) {
        console.error(error);
        if (setError) setError("Error de conexión");
        else alert("Error de conexión");
      }
    };
    manejarLogin();
  }

  // ====================== DONACIÓN ======================
  else if (peticion === "manejarDonacion") {
    const manejarDonacion = async () => {
      try {
        const respuesta = await fetch(`${URL_BFF}/api/donaciones/donar`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
          setDonacionStatus("Donación registrada correctamente.");
        } else {
          setError(resultado.error || "No se pudo procesar la donación");
        }
      } catch (error) {
        console.error(error);
        setError("Error de conexión con el servidor");
      }
    };
    manejarDonacion();
  }

  // ====================== LOGÍSTICA ======================
  else if (peticion === "manejarLogistica") {
    const manejarLogistica = async () => {
      try {
        const respuesta = await fetch(`${URL_BFF}/api/logistica`, {
          method: "POST",
          ...config,
          body: JSON.stringify(datos),
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
          alert("Envío registrado correctamente!");

          // Limpiar formulario
          if (setNewEnvio) {
            setNewEnvio({
              carga: [{ nombre: "", cantidad: "" }],
              chofer: "",
              destino: "",
              matricula: "",
              origen: "",
            });
          }

          // Recargar lista
          if (setEnvios) fetchEnvios(setEnvios);
        } else {
          alert(resultado.error || "Error al registrar envío");
        }
      } catch (error) {
        console.error(error);
        alert("Error de conexión");
      }
    };
    manejarLogistica();
  }

  // ====================== ELIMINAR LOGÍSTICA ======================
  else if (peticion === "eliminarLogistica") {
    const eliminarLogistica = async () => {
      try {
        const respuesta = await fetch(`${URL_BFF}/api/logistica/${datos}`, {
          method: "DELETE",
          headers: config.headers, // DELETE no necesita body
        });

        if (respuesta.ok) {
          alert("Envío eliminado correctamente");
          if (setEnvios) fetchEnvios(setEnvios);
        } else {
          alert("Error al eliminar el envío");
        }
      } catch (error) {
        console.error(error);
        alert("Error de conexión");
      }
    };
    eliminarLogistica();
  }
}

// Función auxiliar para recargar envíos (evitamos duplicar código)
const fetchEnvios = async (setEnvios) => {
  try {
    const response = await fetch(`${URL_BFF}/api/logistica`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    setEnvios(data.data || []);
  } catch (err) {
    console.error("Error recargando envíos:", err);
  }
};
