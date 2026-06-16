import { motion } from 'framer-motion';
import { useMouseParallax } from '../../hooks/useMouseParallax';

interface ParallaxPanelProps {
  src: string;
  alt: string;
  depth?: number;
  className?: string;
  glow?: string;
}

export default function ParallaxPanel({
  src,
  alt,
  depth = 30,
  className = '',
  glow = 'rgba(0, 212, 255, 0.3)',
}: ParallaxPanelProps) {
  const { x, y } = useMouseParallax(depth);

  return (
    <motion.div
      className={`parallax-panel ${className}`}
      style={{
        transform: `translate3d(${x}px, ${y}px, 0) rotateY(${x * 0.15}deg) rotateX(${-y * 0.15}deg)`,
        boxShadow: `0 30px 80px ${glow}, 0 0 0 1px rgba(255,255,255,0.08)`,
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover object-top rounded-lg" draggable={false} />
      <div className="panel-scanline" />
      <div className="panel-corner tl" />
      <div className="panel-corner tr" />
      <div className="panel-corner bl" />
      <div className="panel-corner br" />
    </motion.div>
  );
}
