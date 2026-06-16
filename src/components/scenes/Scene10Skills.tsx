import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../../data/scenes';
import { SceneLabel, SceneTitle } from '../ui/SceneText';
import ContinueButton from '../ui/ContinueButton';

interface Scene10SkillsProps {
  onContinue: () => void;
}

export default function Scene10Skills({ onContinue }: Scene10SkillsProps) {
  const [activeModules, setActiveModules] = useState<boolean[]>(SKILLS.map(() => false));

  useEffect(() => {
    SKILLS.forEach((_, i) => {
      setTimeout(() => {
        setActiveModules((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 400 + i * 300);
    });
  }, []);

  return (
    <div className="scene scene-skills">
      <div className="skills-os-bg" />
      <div className="skills-terminal-bar">
        <span>SKILL_OS v3.7.1</span>
        <span className="text-emerald-400">● ALL MODULES ONLINE</span>
      </div>

      <div className="skills-header">
        <SceneLabel>SCENE 10 — SKILL OPERATING SYSTEM</SceneLabel>
        <SceneTitle>Skill Operating System</SceneTitle>
      </div>

      <div className="skills-modules">
        {SKILLS.map((skill, i) => (
          <motion.div
            key={skill.name}
            className={`skill-module ${activeModules[i] ? 'active' : ''}`}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: activeModules[i] ? 1 : 0.3, x: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
          >
            <div className="skill-module-header">
              <div className="skill-module-icon">
                <span className="skill-pulse" />
                {activeModules[i] ? '◉' : '○'}
              </div>
              <div className="skill-module-info">
                <span className="skill-module-name">{skill.name}</span>
                <span className="skill-module-status">
                  {activeModules[i] ? 'RUNNING' : 'INITIALIZING...'}
                </span>
              </div>
              <span className="skill-module-pct">{skill.value}%</span>
            </div>
            <div className="skill-module-bar">
              <motion.div
                className="skill-module-fill"
                initial={{ width: 0 }}
                animate={{ width: activeModules[i] ? `${skill.value}%` : 0 }}
                transition={{ delay: 0.5 + i * 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="skill-module-grid" />
            </div>
            <div className="skill-module-data">
              {Array.from({ length: 5 }).map((_, j) => (
                <span key={j} className="skill-data-bit">
                  {activeModules[i] ? (Math.random() > 0.5 ? '1' : '0') : '-'}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="skills-continue">
        <ContinueButton onClick={onContinue} label="VIEW FUTURE VISION" />
      </div>
    </div>
  );
}
