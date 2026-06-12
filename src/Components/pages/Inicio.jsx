import GlareHover from "../GlareHover";
import { NavLink } from "react-router-dom";
import "../../App.css";
import fondoinicio from "../../assets/imgs/fondoinicio.jpg"
import React from "react";
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
          <h1>Diferentes formas de ayudar</h1>
          <strong id="parrafo-inicial">
            Además de las donaciones monetarias, también puedes contribuir con
            comida, ropa, voluntariado o compartiendo nuestras campañas en tus
            redes sociales. Cada acción cuenta y puede marcar una gran
            diferencia en la vida de alguien que lo necesita.
          </strong>
        </div>
      </div>

      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center blur-[6px]"
          style={{backgroundImage:`url(${fondoinicio})`}}
        ></div>
        <div className="mb-4 mt-4 mask-t-from-70% p-20 flex flex-row flex-wrap items-center justify-between gap-10">
          
          <div style={{ height: "400px", position: "relative" }}>
            
            <NavLink className="textoTar" to="/Nosotros">
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
          <div style={{ height: "400px", position: "relative" }}>
            <NavLink className="textoTar" to="/Sedes">
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
          <div style={{ height: "400px", position: "relative" }}>
            <NavLink className="textoTar" to="/solicitudes">
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
        </div>

      <div id="footer">
        <footer>
          <p>Sitio web desarrollado por brx2b</p>
        </footer>
      </div>
    </>
  );
}
