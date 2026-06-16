import { useState, useEffect } from 'react';

const ITEMS = ['🍕', '🍔', '🍜', '🥗', '🍰', '🥤'];

interface MemoryGameProps {
  onWin: () => void;
}

export default function MemoryGame({ onWin }: MemoryGameProps) {
  const [cards, setCards] = useState<{ id: number; emoji: string; flipped: boolean; matched: boolean }[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    const deck = [...ITEMS, ...ITEMS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, id) => ({ id, emoji, flipped: false, matched: false }));
    setCards(deck);
  }, []);

  const handleFlip = (index: number) => {
    if (flipped.length === 2 || cards[index].flipped || cards[index].matched || won) return;

    const next = [...cards];
    next[index].flipped = true;
    setCards(next);
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = newFlipped;
      if (cards[a].emoji === cards[b].emoji) {
        setTimeout(() => {
          setCards((prev) => {
            const updated = [...prev];
            updated[a].matched = true;
            updated[b].matched = true;
            if (updated.every((c) => c.matched)) {
              setWon(true);
              onWin();
            }
            return updated;
          });
          setFlipped([]);
        }, 400);
      } else {
        setTimeout(() => {
          setCards((prev) => {
            const updated = [...prev];
            updated[a].flipped = false;
            updated[b].flipped = false;
            return updated;
          });
          setFlipped([]);
        }, 800);
      }
    }
  };

  return (
    <div className="mini-game">
      <h3 className="mini-game-title">Memory Challenge</h3>
      <p className="mini-game-hint">
        {won ? `Won in ${moves} moves! +50 coins` : `Moves: ${moves} — Match menu items`}
      </p>
      <div className="memory-grid">
        {cards.map((card, i) => (
          <button
            key={card.id + '-' + i}
            className={`memory-card ${card.flipped || card.matched ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
            onClick={() => handleFlip(i)}
          >
            <span className="memory-front">?</span>
            <span className="memory-back">{card.emoji}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
