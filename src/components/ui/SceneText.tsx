import { motion } from 'framer-motion';

interface SceneTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function SceneLabel({ children, className = '', delay = 0 }: SceneTextProps) {
  return (
    <motion.p
      initial={{ opacity: 0, letterSpacing: '0.5em' }}
      animate={{ opacity: 1, letterSpacing: '0.3em' }}
      transition={{ delay, duration: 1.2 }}
      className={`scene-label ${className}`}
    >
      {children}
    </motion.p>
  );
}

export function SceneTitle({ children, className = '', delay = 0 }: SceneTextProps) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`scene-title ${className}`}
    >
      {children}
    </motion.h2>
  );
}

export function SceneQuote({ children, className = '', delay = 0 }: SceneTextProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.9 }}
      className={`scene-quote ${className}`}
    >
      {children}
    </motion.p>
  );
}
