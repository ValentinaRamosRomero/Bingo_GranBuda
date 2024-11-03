import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/login.css'

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3000/register`, formData);
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error al registrar");
    }
  };

  return (
    <div>
      <button onClick={() => navigate(-1)}>Regresar</button>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form_register">
          <input
            type="text"
            name="username"
            placeholder="Usuario"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Correo"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
          />
        </div>

        <button type="submit">Registrarse</button>
      </form>
      <p>{message}</p>
    </div>
  );
};
