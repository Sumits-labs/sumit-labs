import { useState, useCallback } from 'react';

interface GuessNumberProps {
  onWin: () => void;
}

export default function GuessNumber({ onWin }: GuessNumberProps) {
  const [target] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [hint, setHint] = useState('Pick a number between 1 and 100');
  const [won, setWon] = useState(false);

  const handleGuess = () => {
    const num = parseInt(guess, 10);
    if (isNaN(num) || num < 1 || num > 100) return;
    const next = attempts + 1;
    setAttempts(next);
    if (num === target) {
      setHint(`Correct in ${next} tries! +30 coins earned`);
      setWon(true);
      onWin();
    } else if (num < target) {
      setHint(`Too low. Attempt ${next}`);
    } else {
      setHint(`Too high. Attempt ${next}`);
    }
    setGuess('');
  };

  return (
    <div className="mini-game">
      <h3 className="mini-game-title">Guess The Number</h3>
      <p className="mini-game-hint">{hint}</p>
      {!won && (
        <div className="mini-game-controls">
          <input
            type="number"
            min={1}
            max={100}
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGuess()}
            className="mini-game-input"
            placeholder="?"
          />
          <button onClick={handleGuess} className="mini-game-btn">GUESS</button>
        </div>
      )}
    </div>
  );
}
