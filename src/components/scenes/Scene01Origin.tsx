import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../../data/assets';

interface Scene01OriginProps {
  onContinue: () => void;
}

export default function Scene01Origin({ onContinue }: Scene01OriginProps) {
  const [zoom, setZoom] = useState(1);
  const [revealed, setRevealed] = useState(false);

  const stars = useMemo(
    () =>
      Array.from({ length: 180 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 6}s`,
        duration: `${3 + Math.random() * 4}s`,
        opacity: Math.random() * 0.7 + 0.15,
        size: Math.random() * 2.5 + 0.5,
      })),
    []
  );

  useEffect(() => {
    const zoomInterval = setInterval(() => {
      setZoom((z) => Math.min(z + 0.0015, 1.35));
    }, 50);

    const revealTimer = setTimeout(() => setRevealed(true), 800);

    return () => {
      clearInterval(zoomInterval);
      clearTimeout(revealTimer);
    };
  }, []);

  return (
    <div className="scene scene-origin">
      <div className="hero-space-layer" style={{ transform: `scale(${zoom})` }}>
        <div className="hero-stars">
          {stars.map((star) => (
            <div
              key={star.id}
              className="hero-star"
              style={{
                left: star.left,
                top: star.top,
                animationDelay: star.delay,
                animationDuration: star.duration,
                opacity: star.opacity,
                width: `${star.size}px`,
                height: `${star.size}px`,
              }}
            />
          ))}
        </div>

        <div className="hero-earth-container">
          <img
            src={ASSETS.earthOrbit}
            alt=""
            className="hero-earth-image"
            draggable={false}
          />
          <div className="hero-earth-atmosphere" />
          <div className="hero-earth-scan" />
        </div>
      </div>

      <div className="hero-hud">
        <div className="hero-hud-corner tl" />
        <div className="hero-hud-corner tr" />
        <div className="hero-hud-corner bl" />
        <div className="hero-hud-corner br" />
        <div className="hero-hud-line hero-hud-line-top" />
        <div className="hero-hud-line hero-hud-line-left" />
        <div className="hero-data-stream stream-1" />
        <div className="hero-data-stream stream-2" />
        <div className="hero-data-stream stream-3" />
        <div className="hero-coords">
          <span>LAT 28.45°N</span>
          <span>ALT 408 KM</span>
          <span>SYS ONLINE</span>
        </div>
      </div>

      <div className="hero-vignette" />

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 30 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="hero-scene-tag">SCENE 01 — ORIGIN</p>

        <h1 className="hero-title">SUMIT LABS</h1>

        <div className="hero-copy">
          <p>Where ideas become systems.</p>
          <p>Where systems become products.</p>
          <p>Where products become businesses.</p>
        </div>

        <motion.button
          type="button"
          className="hero-cta"
          onClick={onContinue}
          whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(0, 212, 255, 0.35)' }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="hero-cta-glow" />
          ENTER THE BLACKBOX
          <span className="hero-cta-arrow">→</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
