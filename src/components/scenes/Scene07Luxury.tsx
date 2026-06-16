import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ASSETS } from '../../data/assets';
import { SceneLabel, SceneQuote } from '../ui/SceneText';

const SECTIONS = [
  { src: ASSETS.ashokaHero, title: 'Welcome Lobby', desc: 'Luxury hospitality entrance' },
  { src: ASSETS.ashokaRooms, title: 'Premium Rooms', desc: 'Deluxe to Suite accommodations' },
  { src: ASSETS.ashokaMenu, title: 'Fine Dining', desc: 'Restaurant & room service menu' },
];

export default function Scene07Luxury() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: ref });
  const lobbyOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

  return (
    <div className="scene scene-project scene-luxury" ref={ref}>
      <motion.div className="luxury-lobby" style={{ opacity: lobbyOpacity }}>
        <div className="luxury-gold-light" />
        <div className="luxury-arch" />
      </motion.div>

      <div className="luxury-content">
        <div className="project-header">
          <SceneLabel>SCENE 07 — ASHOKA LUXURY EXPERIENCE</SceneLabel>
          <SceneQuote>"Hospitality meets digital elegance."</SceneQuote>
        </div>

        <div className="luxury-scroll">
          {SECTIONS.map((section, i) => (
            <motion.div
              key={section.title}
              className="luxury-section"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
            >
              <div className="luxury-section-info">
                <span className="luxury-section-num">0{i + 1}</span>
                <h3 className="luxury-section-title">{section.title}</h3>
                <p className="luxury-section-desc">{section.desc}</p>
              </div>
              <div className="luxury-section-image">
                <img src={section.src} alt={section.title} />
                <div className="luxury-image-frame" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
