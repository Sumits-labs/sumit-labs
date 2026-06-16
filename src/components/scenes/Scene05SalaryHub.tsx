import { motion } from 'framer-motion';
import { ASSETS } from '../../data/assets';
import { SceneLabel, SceneQuote } from '../ui/SceneText';
import ParallaxPanel from '../ui/ParallaxPanel';
import AnimatedCounter from '../ui/AnimatedCounter';

export default function Scene05SalaryHub() {
  return (
    <div className="scene scene-project scene-salaryhub">
      <div className="project-ambient blue" />
      <div className="project-header">
        <SceneLabel>SCENE 05 — SALARYHUB COMMAND CENTER</SceneLabel>
        <SceneQuote>"Managing people, payroll and performance."</SceneQuote>
      </div>

      <div className="command-center">
        <div className="metrics-row">
          {[
            { label: 'Total Employees', value: 2, sub: 'Active employees', color: 'emerald' },
            { label: 'Monthly Salary', value: 1000000, prefix: '₹', sub: 'Total base salaries', color: 'emerald' },
            { label: 'Total Advance', value: 52000, prefix: '₹', sub: 'This month', color: 'red' },
            { label: 'Total Bonus', value: 60802, prefix: '₹', sub: 'This month', color: 'emerald' },
            { label: 'Total Deductions', value: 6000, prefix: '₹', sub: 'This month', color: 'red' },
          ].map((m, i) => (
            <motion.div
              key={m.label}
              className="metric-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="metric-card-label">{m.label}</div>
              <div className={`metric-card-value text-${m.color}-400`}>
                <AnimatedCounter value={m.value} prefix={m.prefix || ''} />
              </div>
              <div className={`metric-card-sub text-${m.color}-400/70`}>{m.sub}</div>
            </motion.div>
          ))}
        </div>

        <div className="panels-grid">
          <ParallaxPanel
            src={ASSETS.salaryhubDashboard}
            alt="SalaryHub Dashboard"
            depth={25}
            className="panel-large"
            glow="rgba(90, 120, 240, 0.4)"
          />
          <ParallaxPanel
            src={ASSETS.salaryhubSalary}
            alt="Salary Calculation"
            depth={35}
            className="panel-medium"
            glow="rgba(34, 197, 94, 0.3)"
          />
        </div>
      </div>
    </div>
  );
}
