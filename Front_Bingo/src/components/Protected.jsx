import React, { useEffect, useState } from "react";
import axios from "axios";
import { CardUser } from "./CardUser";
import { Board } from "./Board";
export const Protected = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:3000/protected`,
          { headers: { Authorization: token } }
        );
      } catch (error) {
        setMessage("No tienes acceso a esta página.");
      }
    };
    fetchProtectedData();
  }, []);

  return (
    <>
      <h2>{message}</h2>
      <Board/>
    </>
  );
};
