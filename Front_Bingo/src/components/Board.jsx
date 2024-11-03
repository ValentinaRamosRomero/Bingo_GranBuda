import React, { useEffect, useState } from "react";
import '../assets/board.css'
// Genera un tablero de bingo con formato 5x5
const generateBoard = () => {
  const columns = { B: [], I: [], N: [], G: [], O: [] };
  for (let [key, min] of Object.entries({ B: 1, I: 16, N: 31, G: 46, O: 61 })) {
      const columnNumbers = new Set();
      while (columnNumbers.size < 5) {
          const num = Math.floor(Math.random() * 15) + min;
          columnNumbers.add(num);
      }
      columns[key] = Array.from(columnNumbers);
  }
  columns.N[2] = "FREE"; // Espacio libre en el centro
  return columns;
};

// Números de 1 a 75 para llamar en el juego
const allNumbers = Array.from({ length: 75 }, (_, i) => i + 1);

export const Board = () => {
  const [players, setPlayers] = useState([{ id: 1, board: generateBoard(), selected: [] }]);
    const [calledNumbers, setCalledNumbers] = useState([]);
    const [winner, setWinner] = useState(null);

    // Llama un número aleatorio no repetido
    const callNumber = () => {
        if (calledNumbers.length >= allNumbers.length || winner) return;
        const remainingNumbers = allNumbers.filter(num => !calledNumbers.includes(num));
        const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
        const newNumber = remainingNumbers[randomIndex];
        setCalledNumbers([...calledNumbers, newNumber]);
        
        // Marcar automáticamente el número en los cartones de los jugadores
        setPlayers(players.map(player => {
            const newSelected = player.selected.includes(newNumber) || Object.values(player.board).flat().includes(newNumber)
                ? [...player.selected, newNumber]
                : player.selected;
            return { ...player, selected: newSelected };
        }));
    };

    // Revisa si un jugador tiene bingo en su tablero
    useEffect(() => {
        
        players.forEach(player => checkForBingo(player));
    }, [calledNumbers]);

    const checkForBingo = (player) => {
        const { board, selected } = player;
        const marked = new Set(selected);

        const hasBingo = (lines) => lines.some(line => line.every(cell => marked.has(cell) || cell === "FREE"));

        const rows = Object.values(board);
        const columns = rows[0].map((_, i) => rows.map(row => row[i]));
        const diagonals = [[board.B[0], board.I[1], board.N[2], board.G[3], board.O[4]], [board.B[4], board.I[3], board.N[2], board.G[1], board.O[0]]];

        if (hasBingo([...rows, ...columns, ...diagonals])) {
            setWinner(player.id);
        }
    };

    const addPlayer = () => {
        const newPlayer = { id: players.length + 1, board: generateBoard(), selected: [] };
        setPlayers([...players, newPlayer]);
    };

    const resetGame = () => {
        setPlayers(players.map(player => ({ ...player, board: generateBoard(), selected: [] })));
        setCalledNumbers([]);
        setWinner(null);
    };

    return (
        <div className="App">
            <h1>Juego de Bingo</h1>
            <button onClick={callNumber} disabled={winner}>Llamar número</button>
            <button onClick={addPlayer} disabled={winner}>Agregar jugador</button>
            <button onClick={resetGame}>Reiniciar juego</button>
            {calledNumbers.length > 0 && (
                <div className="called-numbers">
                    <h3>Números llamados: {calledNumbers.join(", ")}</h3>
                </div>
            )}
            <div className="boards">
                {players.map(player => (
                    <div key={player.id} className="board">
                        <h2>Jugador {player.id}</h2>
                        <div className="bingo-grid">
                            {Object.entries(player.board).map(([col, nums], colIdx) =>
                                nums.map((num, rowIdx) => (
                                    <div
                                        key={`${col}-${rowIdx}`}
                                        className={`cell ${player.selected.includes(num) ? "selected" : ""}`}
                                    >
                                        {num}
                                    </div>
                                ))
                            )}
                        </div>+
                        {winner === player.id && <h3>¡Bingo!</h3>}
                    </div>
                ))}
            </div>
        </div>
    );
};


