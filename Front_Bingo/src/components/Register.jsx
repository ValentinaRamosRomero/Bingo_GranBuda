import  { useState } from 'react';
import axios from 'axios';

export const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/register`);
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error al registrar');
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Usuario" onChange={handleChange} />
        <input type="email" name="email" placeholder="Correo" onChange={handleChange} />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
        <button type="submit">Registrarse</button>
      </form>
      <p>{message}</p>
    </div>
  )
}
