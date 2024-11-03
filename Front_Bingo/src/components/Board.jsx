import { useState } from "react";
import "../styles/board.css";
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
  const [players, setPlayers] = useState([
    { name: "Jugador 1", board: generateBoard(), selectedNumbers: [] },
  ]);
  const [calledNumbers, setCalledNumbers] = useState([]);
  const [winner, setWinner] = useState(null);

  // Llama un número aleatorio no repetido
  const callNumber = () => {
    if (calledNumbers.length >= allNumbers.length || winner) return;
    const remainingNumbers = allNumbers.filter(
      (num) => !calledNumbers.includes(num)
    );
    const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
    const newNumber = remainingNumbers[randomIndex];
    setCalledNumbers([...calledNumbers, newNumber]);
  };

  // Añadir un nuevo jugador
  const addPlayer = () => {
    const newPlayer = {
      name: `Jugador ${players.length + 1}`,
      board: generateBoard(),
      selectedNumbers: [],
    };
    setPlayers([...players, newPlayer]);
  };

  // Maneja el marcado manual de números por el jugador
  const handleCellClick = (playerIndex, col, row) => {
    const player = players[playerIndex];
    const num = player.board[col][row];

    if (
      !player.selectedNumbers.includes(num) &&
      (calledNumbers.includes(num) || num === "FREE")
    ) {
      const updatedPlayers = [...players];
      updatedPlayers[playerIndex] = {
        ...player,
        selectedNumbers: [...player.selectedNumbers, num],
      };
      setPlayers(updatedPlayers);
    }
  };

  const checkForBingo = (playerIndex) => {
    const player = players[playerIndex];
    const marked = new Set(player.selectedNumbers);

    const rows = Object.values(player.board);
    const columns = rows[0].map((_, i) => rows.map((row) => row[i]));
    const diagonals = [
      [
        player.board.B[0],
        player.board.I[1],
        player.board.N[2],
        player.board.G[3],
        player.board.O[4],
      ],
      [
        player.board.B[4],
        player.board.I[3],
        player.board.N[2],
        player.board.G[1],
        player.board.O[0],
      ],
    ];

    const hasBingo = (lines) =>
      lines.some((line) =>
        line.every((cell) => marked.has(cell) || cell === "FREE")
      );

    if (hasBingo([...rows, ...columns, ...diagonals])) {
      setWinner(player.name);
    } else {
      alert(`${player.name}, ¡Aún no tienes Bingo!`);
    }
  };

  const resetGame = () => {
    setPlayers(
      players.map((player) => ({
        ...player,
        board: generateBoard(),
        selectedNumbers: [],
      }))
    );
    setCalledNumbers([]);
    setWinner(null);
  };

  return (
    <div className="App">
      <h1>El Bingo Gran Buda 🧘‍♂️</h1>
      <button onClick={callNumber} disabled={!!winner} className="llamar">
        Llamar número
      </button>
      <button
        onClick={addPlayer}
        disabled={!!winner}
        className="agregar-jugador"
      >
        Agregar jugador
      </button>
      <button onClick={resetGame} className="reinicio">
        Reiniciar juego
      </button>
      {calledNumbers.length > 0 && (
        <div className="called-numbers">
          <h3>Números llamados: {calledNumbers.join(", ")}</h3>
        </div>
      )}
      <div className="boards">
        {players.map((player, index) => (
          <div key={index} className="player-board">
            <h2>{player.name}</h2>
            <button
              onClick={() => checkForBingo(index)}
              disabled={!!winner}
              className="ganar"
            >
              ¡Bingo!
            </button>
            <div className="bingo-grid">
              {Object.entries(player.board).map(([col, nums]) =>
                nums.map((num, rowIdx) => (
                  <div
                    key={`${col}-${rowIdx}`}
                    className={`cell ${
                      player.selectedNumbers.includes(num) ? "selected" : ""
                    }`}
                    onClick={() => handleCellClick(index, col, rowIdx)}
                  >
                    {num}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
        {winner && <h2>🎉 {winner} ha ganado el Bingo! 🎉</h2>}
      </div>
    </div>
  );
};