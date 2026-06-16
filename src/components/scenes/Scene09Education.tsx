import { motion } from 'framer-motion';
import { ASSETS } from '../../data/assets';
import { SceneLabel, SceneQuote } from '../ui/SceneText';
import ParallaxPanel from '../ui/ParallaxPanel';
import AnimatedCounter from '../ui/AnimatedCounter';

const STATS = [
  { value: 25, suffix: '+', label: 'Years of Excellence' },
  { value: 5000, suffix: '+', label: 'Alumni Network' },
  { value: 100, suffix: '+', label: 'Expert Educators' },
  { value: 98, suffix: '%', label: 'Board Results' },
];

const FACILITIES = [
  'Smart Classrooms', 'AC Classrooms', 'CCTV Surveillance', 'Science Labs',
  'Computer Lab', 'Library', 'Transport', 'Sports Ground',
  'Drinking Water', 'Indoor Games', 'Playground', 'Secure Campus',
];

export default function Scene09Education() {
  return (
    <div className="scene scene-project scene-education">
      <div className="project-ambient navy" />
      <div className="project-header">
        <SceneLabel>SCENE 09 — EDUCATION PLATFORM</SceneLabel>
        <SceneQuote>"Technology built for education."</SceneQuote>
      </div>

      <div className="education-content">
        <div className="panels-grid education-panels">
          <ParallaxPanel src={ASSETS.holyheartHome} alt="Holy Heart School" depth={20} className="panel-large" glow="rgba(212, 175, 55, 0.3)" />
          <ParallaxPanel src={ASSETS.holyheartFacilities} alt="Facilities" depth={30} className="panel-medium" glow="rgba(11, 29, 51, 0.5)" />
          <ParallaxPanel src={ASSETS.holyheartContact} alt="Contact" depth={25} className="panel-medium offset" glow="rgba(212, 175, 55, 0.2)" />
        </div>

        <div className="education-stats">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="edu-stat"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <div className="edu-stat-value">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <div className="edu-stat-label">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="facilities-grid">
          {FACILITIES.map((f, i) => (
            <motion.div
              key={f}
              className="facility-chip"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.04 }}
              whileHover={{ borderColor: 'rgba(212, 175, 55, 0.6)', scale: 1.05 }}
            >
              {f}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
