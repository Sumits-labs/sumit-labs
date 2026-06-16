import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSETS } from '../../data/assets';
import { SceneLabel, SceneQuote } from '../ui/SceneText';
import ParallaxPanel from '../ui/ParallaxPanel';
import GuessNumber from '../games/GuessNumber';
import TicTacToe from '../games/TicTacToe';
import MemoryGame from '../games/MemoryGame';

type GameId = 'guess' | 'tictactoe' | 'memory' | null;

const GAMES = [
  { id: 'memory' as const, name: 'Memory Challenge', coins: 50, xp: 25, difficulty: 'MEDIUM', tag: 'FEATURED' },
  { id: 'guess' as const, name: 'Guess The Number', coins: 30, xp: 15, difficulty: 'EASY', tag: 'POPULAR' },
  { id: 'tictactoe' as const, name: 'Tic Tac Toe', coins: 40, xp: 20, difficulty: 'EASY', tag: 'CLASSIC' },
];

export default function Scene08Rewards() {
  const [coins, setCoins] = useState(1200);
  const [xp, setXp] = useState(340);
  const [activeGame, setActiveGame] = useState<GameId>(null);

  const handleWin = (earnedCoins: number, earnedXp: number) => {
    setCoins((c) => c + earnedCoins);
    setXp((x) => x + earnedXp);
  };

  return (
    <div className="scene scene-project scene-rewards">
      <div className="rewards-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="floating-coin"
            animate={{ y: [0, -30, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 3 }}
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          >
            ✦
          </motion.div>
        ))}
      </div>

      <div className="project-header">
        <SceneLabel>SCENE 08 — REWARDS ENGINE</SceneLabel>
        <SceneQuote>"Turning customer engagement into entertainment."</SceneQuote>
      </div>

      <div className="rewards-hud">
        <div className="rewards-stat">
          <span className="rewards-stat-label">COINS</span>
          <motion.span key={coins} className="rewards-stat-value" initial={{ scale: 1.3 }} animate={{ scale: 1 }}>
            ✦ {coins.toLocaleString()}
          </motion.span>
        </div>
        <div className="rewards-xp-bar">
          <span className="rewards-stat-label">XP</span>
          <div className="xp-track">
            <motion.div className="xp-fill" animate={{ width: `${(xp % 500) / 5}%` }} />
          </div>
          <span className="rewards-stat-value">+{xp} XP</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeGame ? (
          <motion.div
            key="game"
            className="game-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <button className="game-back" onClick={() => setActiveGame(null)}>← BACK</button>
            {activeGame === 'guess' && <GuessNumber onWin={() => handleWin(30, 15)} />}
            {activeGame === 'tictactoe' && <TicTacToe onWin={() => handleWin(40, 20)} />}
            {activeGame === 'memory' && <MemoryGame onWin={() => handleWin(50, 25)} />}
          </motion.div>
        ) : (
          <motion.div key="select" className="rewards-content" exit={{ opacity: 0 }}>
            <div className="panels-row">
              <ParallaxPanel src={ASSETS.gamesHero} alt="Gaming Lounge" depth={15} className="panel-small" />
              <ParallaxPanel src={ASSETS.gamesSelect} alt="Game Selection" depth={25} className="panel-small" />
              <ParallaxPanel src={ASSETS.rewards} alt="Rewards" depth={20} className="panel-small" />
            </div>

            <div className="game-cards">
              {GAMES.map((game, i) => (
                <motion.button
                  key={game.id}
                  className="game-card"
                  onClick={() => setActiveGame(game.id)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(212, 175, 55, 0.3)' }}
                >
                  <div className="game-tags">
                    <span className="game-tag gold">{game.tag}</span>
                    <span className="game-tag green">{game.difficulty}</span>
                  </div>
                  <h4 className="game-name">{game.name}</h4>
                  <div className="game-rewards">
                    <span>✦ {game.coins} COINS</span>
                    <span>+{game.xp} XP</span>
                  </div>
                  <span className="game-play">▶ PLAY NOW</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
