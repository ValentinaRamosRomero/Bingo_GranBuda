import { Link } from "react-router-dom";
import buda from "../styles/buda.png";

export const Home = () => {
  return (
    <div>
      <img src={buda} alt="Bingo Buda" />
      <h1>Bienvenido al ¡Bingo Gran Buda!</h1>
      <div className="buttons">
        <Link to="/login">
          <button>Iniciar Sesión</button>
        </Link>
        <Link to="/register">
          <button>Registrarse</button>
        </Link>
      </div>
    </div>
  );
};
