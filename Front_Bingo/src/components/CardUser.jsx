import React, { useState } from 'react'
import 

export const CardUser = () => {
    //const [numerosGenerados, setNumerosGenerados] = useState(new Set());
    const [numeros, setNumeros] = useState([]);

    const iniciarJuego = () => {
        const nuevosNumeros = [];
        while (nuevosNumeros.length < 25) {
            const numero = Math.floor(Math.random() * 75) + 1;
            if (!nuevosNumeros.includes(numero)) {
                nuevosNumeros.push(numero)
            }
        }

        const matriz = [];
    for (let i = 0; i < 5; i++) {
        matriz.push(nuevosNumeros.slice(i * 5, (i + 1) * 5));
        
    }
    setNumeros(matriz);
        
    }
    return (

        <div>
            <h1>Bingo Gran Buda</h1>
            <button onClick={iniciarJuego}>Iniciar Juego</button>
            <table>
                <tbody>
                    {numeros.map((fila,index) => (
                        <tr key={index}>
                            {fila.map((numero,i) =>(
                                <td key={i}>{numero}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}
