import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const isActiveRef = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let trails: HTMLDivElement[] = [];
    
    const createTrails = () => {
      for (let i = 0; i < 8; i++) {
        const trail = document.createElement('div');
        trail.className = 'trail';
        document.body.appendChild(trail);
        trails.push(trail);
      }
      trailsRef.current = trails;
    };
    
    createTrails();

    const moveHandler = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      
      if (dot) {
        dot.style.left = `${targetX - 10}px`;
        dot.style.top = `${targetY - 10}px`;
      }
    };

    const mouseDown = () => {
      isActiveRef.current = true;
      if (dot) dot.classList.add('active');
    };
    
    const mouseUp = () => {
      isActiveRef.current = false;
      if (dot) dot.classList.remove('active');
    };

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mousedown', mouseDown);
    document.addEventListener('mouseup', mouseUp);

    // Smooth trail animation
    let frame: number;
    const animateTrails = () => {
      if (!trails.length) return;
      
      x += (targetX - x) * 0.25;
      y += (targetY - y) * 0.25;
      
      trails.forEach((trail, index) => {
        trail.style.left = `${x - 3 + Math.sin(Date.now() / 300 + index) * 3}px`;
        trail.style.top = `${y - 3 + Math.cos(Date.now() / 400 + index) * 2}px`;
        trail.style.opacity = `${0.6 - index * 0.07}`;
        trail.style.transform = `scale(${1 - index * 0.1})`;
      });
      
      frame = requestAnimationFrame(animateTrails);
    };
    
    animateTrails();

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mousedown', mouseDown);
      document.removeEventListener('mouseup', mouseUp);
      
      trails.forEach(t => {
        if (t.parentNode) t.parentNode.removeChild(t);
      });
    };
  }, []);

  return (
    <div 
      ref={dotRef}
      className="cursor-dot fixed z-[9999] pointer-events-none"
      style={{ left: '-100px', top: '-100px' }}
    />
  );
};

export default CustomCursor;
