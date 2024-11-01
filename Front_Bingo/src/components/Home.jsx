import { Link } from "react-router-dom"


export const Home = () => {
  return (
    <div>
      <h1>Bienvenido</h1>
      <Link to="/login">Iniciar Sesión</Link>
      <Link to="/registro">Registrarse</Link>
   </div>
  )
}
