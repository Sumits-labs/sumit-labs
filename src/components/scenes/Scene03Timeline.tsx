import { motion } from 'framer-motion';
import { TIMELINE } from '../../data/scenes';
import { SceneLabel, SceneTitle, SceneQuote } from '../ui/SceneText';

export default function Scene03Timeline() {
  return (
    <div className="scene scene-timeline">
      <div className="timeline-header">
        <SceneLabel>SCENE 03 — TIMELINE ARCHIVE</SceneLabel>
        <SceneTitle>Timeline Archive</SceneTitle>
        <SceneQuote>Classified development files — decrypted in chronological order.</SceneQuote>
      </div>

      <div className="timeline-vertical">
        <div className="timeline-spine" />

        {TIMELINE.map((item, i) => (
          <motion.div
            key={item.file}
            className="timeline-archive-node"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
          >
            <div className="timeline-node-marker">
              <div className="timeline-node-dot" />
              {i < TIMELINE.length - 1 && <div className="timeline-node-arrow">↓</div>}
            </div>

            <div className={`timeline-archive-file status-${item.status.toLowerCase()}`}>
              <div className="archive-file-header">
                <span className="archive-file-id">{item.file}</span>
                <span className={`archive-file-status status-${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </div>

              <div className="archive-file-body">
                <div className="archive-file-icon">{item.indicator}</div>
                <div className="archive-file-content">
                  <div className="archive-file-age">
                    {item.age ? `AGE ${item.age}` : item.year}
                  </div>
                  <div className="archive-file-year">{item.year}</div>
                  <p className="archive-file-text">{item.achievement}</p>
                </div>
              </div>

              <div className="archive-file-footer">
                <span>CLASSIFICATION: INTERNAL</span>
                <span>INDEX: {String(i + 1).padStart(2, '0')}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
