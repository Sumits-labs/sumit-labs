import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../../data/assets';
import { SceneLabel, SceneTitle } from '../ui/SceneText';
import ContinueButton from '../ui/ContinueButton';

interface Scene02SubjectProps {
  onContinue: () => void;
}

const HUD_LINES = [
  { label: 'Name', value: 'Sumit Singh' },
  { label: 'Role', value: 'Developer' },
  { label: 'Status', value: 'Building Digital Products' },
  { label: 'Mission', value: 'Transforming Ideas Into Systems' },
];

export default function Scene02Subject({ onContinue }: Scene02SubjectProps) {
  const [scanProgress, setScanProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setRevealed(true), 400);
          return 100;
        }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="scene scene-subject">
      <div className="subject-grid" />
      <div className="subject-scan-beam" style={{ top: `${scanProgress}%` }} />

      <div className="subject-layout">
        <div className="subject-photo-container">
          <motion.div
            className="subject-photo-frame"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: revealed ? 1 : 0.3, scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            <img
              src={ASSETS.sumitPhoto}
              alt="Sumit Singh"
              className="subject-photo"
              style={{ clipPath: `inset(${100 - scanProgress}% 0 0 0)` }}
            />
            <div className="subject-photo-overlay" />
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="scan-line-h" style={{ top: `${12.5 * i}%` }} />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="scan-line-v" style={{ left: `${12.5 * i}%` }} />
            ))}
            <div className="subject-reticle tl" />
            <div className="subject-reticle tr" />
            <div className="subject-reticle bl" />
            <div className="subject-reticle br" />
          </motion.div>

          <motion.div
            className="scan-progress-bar"
            initial={{ width: 0 }}
            animate={{ width: `${scanProgress}%` }}
          />
        </div>

        <motion.div
          className="subject-hud"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: revealed ? 1 : 0.4, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <SceneLabel>SCENE 02 — SUBJECT IDENTIFIED</SceneLabel>
          <SceneTitle className="subject-identified">SUBJECT IDENTIFIED</SceneTitle>

          <div className="subject-data">
            {HUD_LINES.map((line, i) => (
              <motion.div
                key={line.label}
                className="subject-data-row"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: revealed ? 1 : 0, x: 0 }}
                transition={{ delay: 0.5 + i * 0.15 }}
              >
                <span className="data-label">{line.label}:</span>
                <span className="data-value">{line.value}</span>
              </motion.div>
            ))}
          </div>

          <div className="subject-metrics">
            <div className="metric">
              <span className="metric-label">BIOMETRIC</span>
              <span className="metric-val text-emerald-400">VERIFIED</span>
            </div>
            <div className="metric">
              <span className="metric-label">CLEARANCE</span>
              <span className="metric-val text-cyan-400">LEVEL 5</span>
            </div>
            <div className="metric">
              <span className="metric-label">SCAN</span>
              <span className="metric-val">{scanProgress}%</span>
            </div>
          </div>

          {revealed && <ContinueButton onClick={onContinue} className="mt-8" />}
        </motion.div>
      </div>
    </div>
  );
}
