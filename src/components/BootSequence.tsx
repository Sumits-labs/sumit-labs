import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  '> ACCESSING SUMIT LABS...',
  '> Loading diagnostics...',
  '> Decrypting files...',
  '> Scanning projects...',
  '> Authenticating visitor...',
  '> ACCESS GRANTED',
];

interface BootSequenceProps {
  onComplete: () => void;
  visible: boolean;
}

export default function BootSequence({ onComplete, visible }: BootSequenceProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [powerOn, setPowerOn] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!visible) return;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      timers.push(id);
    };

    setLines([]);
    setPowerOn(false);

    BOOT_LINES.forEach((line, index) => {
      schedule(() => {
        setLines((prev) => [...prev, line]);
      }, index * 500);
    });

    const afterLines = BOOT_LINES.length * 500 + 400;
    schedule(() => setPowerOn(true), afterLines);
    schedule(() => onCompleteRef.current(), afterLines + 1600);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="boot-sequence"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={`boot-screen ${powerOn ? 'power-on' : ''}`}>
            <div className="boot-grid" />
            <div className="boot-terminal">
              <div className="boot-header">
                <span className="boot-dot red" />
                <span className="boot-dot yellow" />
                <span className="boot-dot green" />
                <span className="boot-title">SUMIT_LABS // SECURE TERMINAL</span>
              </div>
              <div className="boot-content">
                {lines.map((line, idx) => (
                  <div
                    key={idx}
                    className={`boot-line ${line.includes('GRANTED') ? 'granted' : ''}`}
                  >
                    {line}
                    {idx === lines.length - 1 && !powerOn && (
                      <span className="boot-cursor">█</span>
                    )}
                  </div>
                ))}
                {powerOn && <div className="boot-power-text">SYSTEM ONLINE</div>}
              </div>
            </div>
            {powerOn && <div className="boot-flash" />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
