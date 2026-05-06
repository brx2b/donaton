import "../../App.css";
export default function Solicitudes() {
  const session = localStorage.getItem("token");
  if (session == null) {
    return (
      <>
        <div>
          <h1>Inicia sesión para ver tus solicitudes</h1>
        </div>
        <div id="footer">
          <footer>
            <p>Sitio web desarrollado por brx2b</p>
          </footer>
        </div>
      </>
    );
  }
  return <h1>Solicitudes</h1>;
}
