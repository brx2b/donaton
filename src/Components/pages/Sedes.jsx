import React from "react";
import "../../App.css";
import sedePuntaArenas from "../../assets/imgs/sede_puntaArenas.png";
import sedePuertoMontt from "../../assets/imgs/sede_puertoMontt.png";
import sedeTemuco from "../../assets/imgs/sede_temuco.png";
import sedeConce from "../../assets/imgs/sede_conce.png";
export default function Sedes() {
  return (
    <>
      <div id="contenedor-sedes">
        <div id="sedes-tarjeta">
          <h1>Punta Arenas</h1>
          <strong>Dirección: Av. Libertador Bernardo O'Higgins 1234</strong>
          <p id="parrafo-inicial"></p>
          <img className="img-lugar" src={sedePuntaArenas} />
        </div>
        <div id="sedes-tarjeta">
          <h1>Puerto Montt</h1>
          <strong>Dirección: Av. Varas 542</strong>
          <p id="parrafo-inicial"></p>
          <img className="img-lugar" src={sedePuertoMontt} />
        </div>
        <div id="sedes-tarjeta">
          <h1>Temuco</h1>
          <strong>Dirección: Av. Bosques 8890</strong>
          <p id="parrafo-inicial"></p>
          <img className="img-lugar" src={sedeTemuco} />
        </div>
        <div id="sedes-tarjeta">
          <h1>Concepción</h1>
          <strong>Dirección: Av. Italia 123</strong>
          <p id="parrafo-inicial"></p>
          <img className="img-lugar" src={sedeConce} />
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
