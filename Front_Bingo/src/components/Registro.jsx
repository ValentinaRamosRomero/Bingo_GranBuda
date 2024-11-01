import React, { useState } from 'react'

export const Registro = () => {
    const [formData, setFormData] = useState({username: '', email:'', password:''});
    const [message, setMessage] = useState('');

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]:e.target.value});
    };

    const handleSubmit = async (e) => {
        
    }

  return (
    <div>Registro</div>
  )
}
