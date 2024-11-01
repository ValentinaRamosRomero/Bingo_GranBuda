import React, { useEffect, useState } from 'react'
import axios from 'axios';
export const Protected = () => {
  const [message, setMessage] = useState('');

  useEffect (() => {
    const fetchProtectedData = async () => {
      try{
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/protected`,
          headers: {Authorization: token},
        )
      } catch (error) {
        setMessage('No tienes acceso a esta página.');
    }
    };
    fetchProtectedData()
  }, []);

  return (
    <>
    <h2>{message}</h2>
    </>
  )
}
