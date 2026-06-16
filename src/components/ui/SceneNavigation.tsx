import { motion } from 'framer-motion';

interface SceneNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  canPrevious: boolean;
  canNext: boolean;
  currentLabel?: string;
}

export default function SceneNavigation({
  onPrevious,
  onNext,
  canPrevious,
  canNext,
  currentLabel,
}: SceneNavigationProps) {
  return (
    <nav className="scene-nav" aria-label="Scene navigation">
      <motion.button
        type="button"
        className="scene-nav-btn scene-nav-prev"
        onClick={onPrevious}
        disabled={!canPrevious}
        whileHover={canPrevious ? { x: -4 } : {}}
        whileTap={canPrevious ? { scale: 0.97 } : {}}
      >
        <span className="scene-nav-arrow">←</span>
        <span>PREVIOUS SCENE</span>
      </motion.button>

      {currentLabel && (
        <div className="scene-nav-indicator">
          <span className="scene-nav-dot" />
          {currentLabel}
        </div>
      )}

      <motion.button
        type="button"
        className="scene-nav-btn scene-nav-next"
        onClick={onNext}
        disabled={!canNext}
        whileHover={canNext ? { x: 4 } : {}}
        whileTap={canNext ? { scale: 0.97 } : {}}
      >
        <span>NEXT SCENE</span>
        <span className="scene-nav-arrow">→</span>
      </motion.button>
    </nav>
  );
}
