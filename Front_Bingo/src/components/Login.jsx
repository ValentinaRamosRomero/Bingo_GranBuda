import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, formData);
        localStorage.setItem('token', res.data.token);
        navigate('/protected');
    } catch (error) {
        setMessage(error.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Correo" onChange={handleChange} />
                <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
                <button type="submit">Iniciar sesión</button>
            </form>
            <p>{message}</p>
        </div>
  );
};
