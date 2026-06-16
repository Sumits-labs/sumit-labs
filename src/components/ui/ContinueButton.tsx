import { motion } from 'framer-motion';

interface ContinueButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

export default function ContinueButton({
  onClick,
  label = 'CONTINUE',
  className = '',
}: ContinueButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      onClick={onClick}
      className={`continue-btn ${className}`}
      whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 212, 255, 0.4)' }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="continue-btn-pulse" />
      {label}
      <span className="text-cyan-400/60">→</span>
    </motion.button>
  );
}
