import React from "react";
import "../../App.css";
import target from "../../assets/imgs/target.png";
import origin from "../../assets/imgs/start.png";
export default function Nosotros() {
  return (
    <>
      <div id="contenedor-inicial-nosotros">
        <div id="tarjeta-inicial-nosotros">
          <h1>
            Nuestro objetivo
            <img id="img-1" src={target} />
          </h1>
          <p id="parrafo-inicial">
            El objetivo de nuestra organización es hacer una diferencia positiva
            en la vida de las personas que más lo necesitan, brindándoles apoyo
            y recursos para superar sus dificultades. somos una empresa sin
            fines de lucro que busca reducir y brindar apoyo en diferentes
            aspectos en caso de emergencias y personas necesidadas de la calle.
          </p>
        </div>
        <div id="tarjeta-inicial-nosotros">
          <h1>
            Origen
            <img id="img-2" src={origin} />
          </h1>

          <p id="parrafo-inicial">
            De origen chileno con sedes en diferentes partes del país desde
            Punta Arenas hasta Santiago, nacimos con la misión de ayudar a
            quienes más lo necesitan, brindando apoyo a través de donaciones y
            colaboraciones con diversas organizaciones. Nuestra pasión por hacer
            el bien nos impulsa a seguir creciendo y expandiendo nuestro alcance
            para llegar a más personas en situación de vulnerabilidad.
          </p>
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
