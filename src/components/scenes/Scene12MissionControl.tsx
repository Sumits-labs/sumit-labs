import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneLabel, SceneTitle } from '../ui/SceneText';
import { useSound } from '../../hooks/useSound';

export default function Scene12MissionControl() {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const { transmissionSound } = useSound();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSending(true);
    transmissionSound();
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 2000);
  };

  return (
    <div className="scene scene-mission">
      <div className="mission-wall">
        <div className="mission-grid-lines" />
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="mission-data-stream"
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
            style={{ left: `${8 + i * 8}%` }}
          />
        ))}
      </div>

      <div className="mission-content">
        <SceneLabel>FINAL SCENE — MISSION CONTROL</SceneLabel>
        <SceneTitle className="mission-title">MISSION CONTROL</SceneTitle>
        <p className="mission-subtitle">Ready To Build Something Extraordinary?</p>

        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.form
              key="form"
              className="transmission-terminal"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="terminal-header">
                <span>CLASSIFIED TRANSMISSION CHANNEL</span>
                <span className="terminal-status">● ENCRYPTED</span>
              </div>

              <div className="terminal-field">
                <label>IDENTITY</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  className="terminal-input"
                />
              </div>

              <div className="terminal-field">
                <label>RETURN FREQUENCY</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="terminal-input"
                />
              </div>

              <div className="terminal-field">
                <label>TRANSMISSION MESSAGE</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your mission objective..."
                  rows={5}
                  required
                  className="terminal-input terminal-textarea"
                />
              </div>

              <motion.button
                type="submit"
                className="transmission-btn"
                disabled={sending}
                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(0, 212, 255, 0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                {sending ? 'TRANSMITTING...' : 'INITIATE CONTACT'}
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="sent"
              className="transmission-sent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                className="sent-icon"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6 }}
              >
                ✓
              </motion.div>
              <h3 className="sent-title">TRANSMISSION SENT</h3>
              <p className="sent-subtitle">Connection Established With Sumit Singh</p>
              <div className="sent-end">END EXPERIENCE</div>
              <p className="sent-email">sumitsingh.dev@gmail.com</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
