import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  count?: number;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ count = 45 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 5 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.animationDuration = `${Math.random() * 25 + 15}s`;
      particle.style.animationDelay = `-${Math.random() * 25}s`;
      particle.style.opacity = `${Math.random() * 0.5 + 0.3}`;
      
      if (Math.random() > 0.7) {
        particle.style.background = '#3b82f6';
      }
      
      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, [count]);

  return <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden pointer-events-none" />;
};

export default ParticleBackground;
