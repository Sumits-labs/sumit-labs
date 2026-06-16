import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="text-center mb-16"
    >
      <div className="inline-flex items-center gap-3 mb-4">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400"></div>
        <div className="text-amber-400 text-sm tracking-[4px] font-mono">CHAPTER {Math.floor(Math.random()*100)}</div>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400"></div>
      </div>
      
      <h2 className="text-6xl md:text-7xl font-bold tracking-tighter neon-text text-white mb-4">
        {title}
      </h2>
      
      {subtitle && (
        <p className="max-w-md mx-auto text-lg text-zinc-400">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
