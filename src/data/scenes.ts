export type SceneId =
  | 'boot'
  | 'origin'
  | 'subject'
  | 'timeline'
  | 'vault'
  | 'salaryhub'
  | 'ashokaos'
  | 'luxury'
  | 'rewards'
  | 'education'
  | 'skills'
  | 'future'
  | 'mission';

export type VaultId = 'salaryhub' | 'ashokaos' | 'rewards' | 'luxury' | 'education';

/** Full linear navigation order for prev/next controls */
export const NAV_ORDER: SceneId[] = [
  'origin',
  'subject',
  'timeline',
  'vault',
  'salaryhub',
  'ashokaos',
  'rewards',
  'luxury',
  'education',
  'skills',
  'future',
  'mission',
];

export const MAIN_SCENES: SceneId[] = [
  'origin',
  'subject',
  'timeline',
  'vault',
  'skills',
  'future',
  'mission',
];

export const VAULT_SCENES: Record<VaultId, SceneId> = {
  salaryhub: 'salaryhub',
  ashokaos: 'ashokaos',
  rewards: 'rewards',
  luxury: 'luxury',
  education: 'education',
};

export const VAULTS = [
  { id: 'salaryhub' as VaultId, number: '01', title: 'SalaryHub SaaS', scene: 'salaryhub' as SceneId },
  { id: 'ashokaos' as VaultId, number: '02', title: 'Ashoka Hotel Management System', scene: 'ashokaos' as SceneId },
  { id: 'rewards' as VaultId, number: '03', title: 'Ashoka Rewards Engine', scene: 'rewards' as SceneId },
  { id: 'luxury' as VaultId, number: '04', title: 'Ashoka Luxury Hotel Website', scene: 'luxury' as SceneId },
  { id: 'education' as VaultId, number: '05', title: 'Holy Heart School Website', scene: 'education' as SceneId },
];

export const TIMELINE = [
  {
    age: 13,
    year: '2019',
    file: 'ARCHIVE-001',
    achievement: 'First curiosity about technology.',
    indicator: '◈',
    status: 'DECRYPTED',
  },
  {
    age: 15,
    year: '2021',
    file: 'ARCHIVE-002',
    achievement: 'Started learning development.',
    indicator: '⬡',
    status: 'DECRYPTED',
  },
  {
    age: 17,
    year: '2023',
    file: 'ARCHIVE-003',
    achievement: 'Built real-world business systems.',
    indicator: '◆',
    status: 'DECRYPTED',
  },
  {
    age: 19,
    year: '2025',
    file: 'ARCHIVE-004',
    achievement: 'Building SaaS products, hotel systems, gamification platforms, and digital experiences.',
    indicator: '✦',
    status: 'ACTIVE',
  },
  {
    age: null,
    year: 'TODAY',
    file: 'ARCHIVE-LIVE',
    achievement: 'Operating classified digital laboratories. Shipping systems that power real businesses.',
    indicator: '●',
    status: 'LIVE',
  },
];

export const SKILLS = [
  { name: 'Frontend Systems', value: 92 },
  { name: 'Backend Systems', value: 85 },
  { name: 'UI Engineering', value: 90 },
  { name: 'Business Logic', value: 95 },
  { name: 'Problem Solving', value: 93 },
];

export const FUTURE_PROJECTS = [
  'AI Systems',
  'SaaS Products',
  'Business Platforms',
  'Hospitality Technology',
  'Gamification Products',
  'Future Startups',
];

export function getNavIndex(scene: SceneId): number {
  return NAV_ORDER.indexOf(scene);
}

export function getPreviousScene(scene: SceneId): SceneId | null {
  const idx = getNavIndex(scene);
  if (idx <= 0) return null;
  return NAV_ORDER[idx - 1];
}

export function getNextScene(scene: SceneId): SceneId | null {
  const idx = getNavIndex(scene);
  if (idx < 0 || idx >= NAV_ORDER.length - 1) return null;
  return NAV_ORDER[idx + 1];
}
