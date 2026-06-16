import { motion } from 'framer-motion';
import { ASSETS } from '../../data/assets';
import { SceneLabel, SceneQuote } from '../ui/SceneText';
import ParallaxPanel from '../ui/ParallaxPanel';
import AnimatedCounter from '../ui/AnimatedCounter';

export default function Scene06AshokaOS() {
  return (
    <div className="scene scene-project scene-ashokaos">
      <div className="project-ambient gold" />
      <div className="project-header">
        <SceneLabel>SCENE 06 — ASHOKA HOTEL OPERATING SYSTEM</SceneLabel>
        <SceneQuote>"Built to manage real hospitality operations."</SceneQuote>
      </div>

      <div className="command-center">
        <div className="metrics-row">
          {[
            { label: 'Total Rooms', value: 12, sub: '10 available' },
            { label: 'Occupied', value: 2, sub: '17% occupancy' },
            { label: 'Revenue Today', value: 50176, prefix: '₹', sub: 'vs yesterday' },
            { label: 'Open Orders', value: 0, sub: 'restaurant tables' },
          ].map((m, i) => (
            <motion.div
              key={m.label}
              className="metric-card light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="metric-card-label">{m.label}</div>
              <div className="metric-card-value text-blue-500">
                <AnimatedCounter value={m.value} prefix={m.prefix || ''} />
              </div>
              <div className="metric-card-sub">{m.sub}</div>
            </motion.div>
          ))}
        </div>

        <div className="panels-grid ashoka-panels">
          <ParallaxPanel
            src={ASSETS.ashokaDashboard}
            alt="Ashoka Dashboard"
            depth={20}
            className="panel-large"
            glow="rgba(37, 99, 235, 0.35)"
          />
          <ParallaxPanel
            src={ASSETS.ashokaBill}
            alt="Hotel Bill"
            depth={40}
            className="panel-medium offset"
            glow="rgba(5, 150, 105, 0.3)"
          />
        </div>
      </div>
    </div>
  );
}
