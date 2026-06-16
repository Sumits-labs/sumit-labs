import { useState, useCallback } from 'react';

type Cell = 'X' | 'O' | null;
type Board = Cell[];

interface TicTacToeProps {
  onWin: () => void;
}

const WINS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export default function TicTacToe({ onWin }: TicTacToeProps) {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [status, setStatus] = useState('Your turn (X)');

  const checkWinner = useCallback((b: Board): Cell | 'draw' | null => {
    for (const [a, c, d] of WINS) {
      if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
    }
    return b.every((c) => c) ? 'draw' : null;
  }, []);

  const aiMove = useCallback((b: Board) => {
    const empty = b.map((c, i) => (c ? -1 : i)).filter((i) => i >= 0);
    if (empty.length === 0) return b;
    const idx = empty[Math.floor(Math.random() * empty.length)];
    const next = [...b];
    next[idx] = 'O';
    return next;
  }, []);

  const handleClick = (i: number) => {
    if (board[i] || checkWinner(board)) return;
    const next = [...board];
    next[i] = 'X';
    const result = checkWinner(next);
    if (result === 'X') {
      setBoard(next);
      setStatus('You win! +40 coins');
      onWin();
      return;
    }
    if (result === 'draw') {
      setBoard(next);
      setStatus('Draw!');
      return;
    }
    const afterAi = aiMove(next);
    const aiResult = checkWinner(afterAi);
    setBoard(afterAi);
    if (aiResult === 'O') setStatus('House wins. Try again!');
    else if (aiResult === 'draw') setStatus('Draw!');
    else setStatus('Your turn (X)');
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setStatus('Your turn (X)');
  };

  return (
    <div className="mini-game">
      <h3 className="mini-game-title">Tic Tac Toe</h3>
      <p className="mini-game-hint">{status}</p>
      <div className="ttt-board">
        {board.map((cell, i) => (
          <button key={i} className="ttt-cell" onClick={() => handleClick(i)} disabled={!!cell || !!checkWinner(board)}>
            {cell}
          </button>
        ))}
      </div>
      <button onClick={reset} className="mini-game-btn mt-4">RESTART</button>
    </div>
  );
}
