import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VAULTS, type VaultId } from '../../data/scenes';
import { SceneLabel, SceneTitle, SceneQuote } from '../ui/SceneText';
import { useSound } from '../../hooks/useSound';

interface Scene04VaultProps {
  onEnterVault: (vaultId: VaultId) => void;
  onSkip: () => void;
  visitedVaults: Set<VaultId>;
}

export default function Scene04Vault({
  onEnterVault,
  onSkip,
  visitedVaults,
}: Scene04VaultProps) {
  const [unlocking, setUnlocking] = useState<VaultId | null>(null);
  const { unlockSound } = useSound();

  const handleDoorClick = (id: VaultId) => {
    if (unlocking) return;
    setUnlocking(id);
    unlockSound();
    setTimeout(() => onEnterVault(id), 1800);
  };

  return (
    <div className="scene scene-vault">
      <div className="vault-ambient" />
      <div className="vault-pillars left" />
      <div className="vault-pillars right" />

      <div className="vault-header">
        <SceneLabel>SCENE 04 — PROJECT VAULT</SceneLabel>
        <SceneTitle>Project Vault</SceneTitle>
        <SceneQuote>Select a vault door to access classified projects — or skip ahead.</SceneQuote>
      </div>

      <div className="vault-doors">
        {VAULTS.map((vault, i) => {
          const isUnlocking = unlocking === vault.id;
          const visited = visitedVaults.has(vault.id);

          return (
            <motion.button
              key={vault.id}
              className={`vault-door ${visited ? 'visited' : ''} ${isUnlocking ? 'unlocking' : ''}`}
              onClick={() => handleDoorClick(vault.id)}
              disabled={!!unlocking}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              whileHover={!unlocking ? { scale: 1.03, y: -5 } : {}}
            >
              <div className="door-frame">
                <div className="door-number">VAULT {vault.number}</div>
                <div className="door-panel">
                  <div className="door-seal" />
                  <div className="door-title">{vault.title}</div>
                  {visited && <div className="door-status">ACCESSED</div>}
                </div>
                <AnimatePresence>
                  {isUnlocking && (
                    <motion.div
                      className="door-opening"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </AnimatePresence>
              </div>
              <div className="door-glow" />
            </motion.button>
          );
        })}
      </div>

      <motion.div
        className="vault-skip"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button type="button" className="vault-skip-btn" onClick={onSkip}>
          SKIP TO NEXT SYSTEM →
        </button>
        <p className="vault-skip-hint">
          {visitedVaults.size}/5 vaults accessed — exploration is optional
        </p>
      </motion.div>
    </div>
  );
}
