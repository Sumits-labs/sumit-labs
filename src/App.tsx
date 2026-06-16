import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { SceneId, VaultId } from './data/scenes';
import { getPreviousScene, getNextScene } from './data/scenes';
import BootSequence from './components/BootSequence';
import SceneNavigation from './components/ui/SceneNavigation';
import Scene01Origin from './components/scenes/Scene01Origin';
import Scene02Subject from './components/scenes/Scene02Subject';
import Scene03Timeline from './components/scenes/Scene03Timeline';
import Scene04Vault from './components/scenes/Scene04Vault';
import Scene05SalaryHub from './components/scenes/Scene05SalaryHub';
import Scene06AshokaOS from './components/scenes/Scene06AshokaOS';
import Scene07Luxury from './components/scenes/Scene07Luxury';
import Scene08Rewards from './components/scenes/Scene08Rewards';
import Scene09Education from './components/scenes/Scene09Education';
import Scene10Skills from './components/scenes/Scene10Skills';
import Scene11Future from './components/scenes/Scene11Future';
import Scene12MissionControl from './components/scenes/Scene12MissionControl';

const SCENE_ORDER: SceneId[] = [
  'origin', 'subject', 'timeline', 'vault',
  'skills', 'future', 'mission',
];

const VAULT_SCENE_MAP: Record<VaultId, SceneId> = {
  salaryhub: 'salaryhub',
  ashokaos: 'ashokaos',
  rewards: 'rewards',
  luxury: 'luxury',
  education: 'education',
};

const SCENE_LABELS: Record<SceneId, string> = {
  boot: 'BOOT',
  origin: 'ORIGIN',
  subject: 'SUBJECT',
  timeline: 'TIMELINE',
  vault: 'VAULT',
  salaryhub: 'SALARYHUB',
  ashokaos: 'ASHOKA OS',
  luxury: 'LUXURY',
  rewards: 'REWARDS',
  education: 'EDUCATION',
  skills: 'SKILLS',
  future: 'FUTURE',
  mission: 'MISSION',
};

export default function App() {
  const [booting, setBooting] = useState(true);
  const [scene, setScene] = useState<SceneId>('origin');
  const [visitedVaults, setVisitedVaults] = useState<Set<VaultId>>(new Set());
  const [showHUD, setShowHUD] = useState(false);

  const finishBoot = useCallback(() => setBooting(false), []);

  useEffect(() => {
    if (!booting) {
      const t = setTimeout(() => setShowHUD(true), 600);
      return () => clearTimeout(t);
    }
  }, [booting]);

  const goTo = useCallback((next: SceneId) => {
    setScene(next);
    window.scrollTo(0, 0);
  }, []);

  const nextScene = useCallback(() => {
    const next = getNextScene(scene);
    if (next) goTo(next);
  }, [scene, goTo]);

  const prevScene = useCallback(() => {
    const prev = getPreviousScene(scene);
    if (prev) goTo(prev);
  }, [scene, goTo]);

  const enterVault = useCallback((vaultId: VaultId) => {
    setVisitedVaults((prev) => new Set([...prev, vaultId]));
    goTo(VAULT_SCENE_MAP[vaultId]);
  }, [goTo]);

  const skipVault = useCallback(() => goTo('skills'), [goTo]);

  const sceneProgress = (() => {
    const mainIdx = SCENE_ORDER.indexOf(scene);
    if (mainIdx >= 0) return ((mainIdx + 1) / SCENE_ORDER.length) * 100;
    return 50;
  })();

  const prev = getPreviousScene(scene);
  const next = getNextScene(scene);

  return (
    <div className="blackbox">
      <BootSequence visible={booting} onComplete={finishBoot} />

      {showHUD && (
        <div className="hud">
          <div className="hud-left">
            <span className="hud-logo">◈ BLACKBOX</span>
            <span className="hud-divider">|</span>
            <span className="hud-scene">{SCENE_LABELS[scene]}</span>
          </div>
          <div className="hud-right">
            <span className="hud-status">● SECURE</span>
            <span className="hud-vaults">{visitedVaults.size}/5 VAULTS</span>
          </div>
          <div className="hud-progress">
            <motion.div className="hud-progress-fill" animate={{ width: `${sceneProgress}%` }} />
          </div>
        </div>
      )}

      <div className="scene-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={scene}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="scene-wrapper"
          >
            {scene === 'origin' && <Scene01Origin onContinue={nextScene} />}
            {scene === 'subject' && <Scene02Subject onContinue={nextScene} />}
            {scene === 'timeline' && <Scene03Timeline />}
            {scene === 'vault' && (
              <Scene04Vault
                onEnterVault={enterVault}
                onSkip={skipVault}
                visitedVaults={visitedVaults}
              />
            )}
            {scene === 'salaryhub' && <Scene05SalaryHub />}
            {scene === 'ashokaos' && <Scene06AshokaOS />}
            {scene === 'luxury' && <Scene07Luxury />}
            {scene === 'rewards' && <Scene08Rewards />}
            {scene === 'education' && <Scene09Education />}
            {scene === 'skills' && <Scene10Skills onContinue={nextScene} />}
            {scene === 'future' && <Scene11Future onContinue={nextScene} />}
            {scene === 'mission' && <Scene12MissionControl />}
          </motion.div>
        </AnimatePresence>
      </div>

      {!booting && (
        <SceneNavigation
          onPrevious={prevScene}
          onNext={nextScene}
          canPrevious={!!prev}
          canNext={!!next}
          currentLabel={SCENE_LABELS[scene]}
        />
      )}
    </div>
  );
}
