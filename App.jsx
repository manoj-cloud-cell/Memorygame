import React, { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const checkWinner = (board) => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];

    for (let line of lines) {
      const [a,b,c] = line;
      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return board[a];
      }
    }

    return board.includes(null) ? null : "Draw";
  };

  const minimax = (newBoard, isMaximizing) => {
    const winner = checkWinner(newBoard);

    if (winner === "O") return 10;
    if (winner === "X") return -10;
    if (winner === "Draw") return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;

      for (let i = 0; i < 9; i++) {
        if (!newBoard[i]) {
          newBoard[i] = "O";
          let score = minimax(newBoard, false);
          newBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;

      for (let i = 0; i < 9; i++) {
        if (!newBoard[i]) {
          newBoard[i] = "X";
          let score = minimax(newBoard, true);
          newBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const aiMove = (currentBoard) => {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < 9; i++) {
      if (!currentBoard[i]) {
        currentBoard[i] = "O";
        let score = minimax(currentBoard, false);
        currentBoard[i] = null;

        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }

    currentBoard[move] = "O";
    setBoard([...currentBoard]);
    setIsPlayerTurn(true);
  };

  const handleClick = (index) => {
    if (
      board[index] ||
      checkWinner(board) ||
      !isPlayerTurn
    )
      return;

    const newBoard = [...board];
    newBoard[index] = "X";

    setBoard(newBoard);
    setIsPlayerTurn(false);

    setTimeout(() => {
      if (!checkWinner(newBoard)) {
        aiMove([...newBoard]);
      }
    }, 500);
  };

  const winner = checkWinner(board);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>

      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>

      <h2>
        {winner
          ? winner === "Draw"
            ? "Game Draw!"
            : `${winner} Wins!`
          : isPlayerTurn
          ? "Your Turn"
          : "AI Thinking..."}
      </h2>

      <button onClick={resetGame}>
        Restart Game
      </button>
    </div>
  );
}

export default App;