import { motion } from 'framer-motion';
import { FUTURE_PROJECTS } from '../../data/scenes';
import { SceneLabel, SceneTitle, SceneQuote } from '../ui/SceneText';
import ContinueButton from '../ui/ContinueButton';

interface Scene11FutureProps {
  onContinue: () => void;
}

export default function Scene11Future({ onContinue }: Scene11FutureProps) {
  return (
    <div className="scene scene-future">
      <div className="future-room">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="future-particle"
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="future-content">
        <SceneLabel>SCENE 11 — FUTURE VISION</SceneLabel>
        <SceneTitle>Future Vision</SceneTitle>

        <div className="future-holograms">
          {FUTURE_PROJECTS.map((project, i) => (
            <motion.div
              key={project}
              className="future-holo"
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.8 }}
              whileHover={{ scale: 1.08, y: -10 }}
            >
              <div className="holo-ring" />
              <div className="holo-content">
                <span className="holo-icon">◈</span>
                <span className="holo-text">{project}</span>
                <span className="holo-status">IN DEVELOPMENT</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="future-quotes"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <SceneQuote className="future-quote-main">"I don't just build websites."</SceneQuote>
          <SceneQuote className="future-quote-sub" delay={0.3}>"I build systems."</SceneQuote>
        </motion.div>

        <ContinueButton onClick={onContinue} label="ENTER MISSION CONTROL" />
      </div>
    </div>
  );
}
