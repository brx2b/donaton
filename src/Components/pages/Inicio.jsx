import GlareHover from "../GlareHover";
import { NavLink } from "react-router-dom";
export default function Inicio() {
  return (
    <>
      <div id="contenedor-inicial">
        <div id="tarjeta-inicial">
          <h1>¿Por qué nosotros?</h1>
          <strong id="parrafo-inicial">
            Hacemos realidad las esperanzas de muchas personas gracias a su
            ayuda y a la de nuestros colaboradores. Con su ayuda, podemos
            brindar apoyo a quienes más lo necesitan y hacer una diferencia
            significativa en sus vidas.
          </strong>
        </div>
        <div id="tarjeta-inicial">
          <h1>Tu granito de arena</h1>
          <strong id="parrafo-inicial">
            Cada pequeña contribución cuenta y puede marcar una gran diferencia
            en la vida de alguien. Al donar, estás ayudando a proporcionar
            recursos esenciales, como alimentos, refugio y atención médica.
          </strong>
        </div>
        <div id="tarjeta-inicial">
          <h1>Tu granito de arena</h1>
          <strong id="parrafo-inicial">
            Cada pequeña contribución cuenta y puede marcar una gran diferencia
            en la vida de alguien. Al donar, estás ayudando a proporcionar
            recursos esenciales, como alimentos, refugio y atención médica.
          </strong>
        </div>
      </div>
      <div id="tarjetas-bajo">
        <div style={{ height: "600px", position: "relative" }}>
          <NavLink className={"NavLink"} to="/Nosotros">
            <GlareHover
              className="GlareHoverStyle"
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
            >
              <h2
                style={{
                  fontSize: "3rem",
                  fontWeight: "900",
                  color: "#ffffff",
                  margin: 0,
                }}
              >
                Nosotros
              </h2>
            </GlareHover>
          </NavLink>
        </div>
        <div style={{ height: "600px", position: "relative" }}>
          <NavLink className={"NavLink"} to="/Sedes">
            <GlareHover
              className="GlareHoverStyle"
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
            >
              <h2
                style={{
                  fontSize: "3rem",
                  fontWeight: "900",
                  color: "#ffffff",
                  margin: 0,
                }}
              >
                Sedes
              </h2>
            </GlareHover>
          </NavLink>
        </div>
        <div style={{ height: "600px", position: "relative" }}>
          <NavLink className={"NavLink"} to="/solicitudes">
            <GlareHover
              className="GlareHoverStyle"
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
            >
              <h2
                style={{
                  fontSize: "3rem",
                  fontWeight: "900",
                  color: "#ffffff",
                  margin: 0,
                }}
              >
                Solicitudes
              </h2>
            </GlareHover>
          </NavLink>
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
