// ============================================
// LYMFAFLOW - TOPICS DATA
// Source: Diplomová práce "Základy anatomie pohybového ústrojí"
// ============================================

import type { Topic, Level } from '@/types';

export const TOPICS: Topic[] = [
  {
    id: 'topic-roviny',
    slug: 'roviny',
    title: 'Roviny těla',
    subtitle: 'Jak popisujeme polohu',
    icon: 'Planes',
    color: '#9370DB',
    sort_order: 1,
    is_locked: false,
  },
  {
    id: 'topic-smery',
    slug: 'smery',
    title: 'Směry na těle',
    subtitle: 'Orientace při masáži',
    icon: 'Directions',
    color: '#87CEEB',
    sort_order: 2,
    is_locked: false,
  },
  {
    id: 'topic-kosti',
    slug: 'kosti',
    title: 'Kostní tkáň',
    subtitle: 'Typy kostí a jejich stavba',
    icon: 'Bone',
    color: '#DEB887',
    sort_order: 3,
    is_locked: false,
  },
  {
    id: 'topic-pater',
    slug: 'pater',
    title: 'Páteř',
    subtitle: 'Opora těla a ochrana míchy',
    icon: 'Spine',
    color: '#B8860B',
    sort_order: 4,
    is_locked: false,
  },
  {
    id: 'topic-klouby',
    slug: 'klouby',
    title: 'Klouby',
    subtitle: 'Pohyb a jeho omezení',
    icon: 'Joint',
    color: '#9DC183',
    sort_order: 5,
    is_locked: false,
  },
  {
    id: 'topic-hk',
    slug: 'horni-koncetina',
    title: 'Horní končetina',
    subtitle: 'Rameno, loket, zápěstí',
    icon: 'Arm',
    color: '#CD853F',
    sort_order: 6,
    is_locked: true,
  },
  {
    id: 'topic-dk',
    slug: 'dolni-koncetina',
    title: 'Dolní končetina',
    subtitle: 'Kyčel, koleno, kotník',
    icon: 'Leg',
    color: '#8B4513',
    sort_order: 7,
    is_locked: true,
  },
  {
    id: 'topic-svaly',
    slug: 'svaly',
    title: 'Svalová soustava',
    subtitle: 'Hlavní svalové skupiny',
    icon: 'Muscle',
    color: '#DC143C',
    sort_order: 8,
    is_locked: true,
  },
];

export const LEVELS: Level[] = [
  { level: 1, name: 'Nováček', min_xp: 0, icon: '🌱' },
  { level: 2, name: 'Student', min_xp: 100, icon: '📚' },
  { level: 3, name: 'Praktikant', min_xp: 300, icon: '💪' },
  { level: 4, name: 'Pokročilý', min_xp: 600, icon: '⭐' },
  { level: 5, name: 'Expert', min_xp: 1000, icon: '🏆' },
  { level: 6, name: 'Mistr', min_xp: 1500, icon: '👑' },
];

// Helper functions
export const getTopicBySlug = (slug: string): Topic | undefined => {
  return TOPICS.find(t => t.slug === slug);
};

export const getTopicById = (id: string): Topic | undefined => {
  return TOPICS.find(t => t.id === id);
};

export const getUnlockedTopics = (): Topic[] => {
  return TOPICS.filter(t => !t.is_locked);
};

export const getLevelByXP = (xp: number): Level => {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].min_xp) return LEVELS[i];
  }
  return LEVELS[0];
};

export const getNextLevel = (currentXP: number): Level | null => {
  const currentLevel = getLevelByXP(currentXP);
  const nextIndex = LEVELS.findIndex(l => l.level === currentLevel.level) + 1;
  return nextIndex < LEVELS.length ? LEVELS[nextIndex] : null;
};

export const getProgressToNextLevel = (xp: number): number => {
  const currentLevel = getLevelByXP(xp);
  const nextLevel = getNextLevel(xp);
  if (!nextLevel) return 100;
  
  const xpInCurrentLevel = xp - currentLevel.min_xp;
  const xpNeededForNext = nextLevel.min_xp - currentLevel.min_xp;
  return Math.round((xpInCurrentLevel / xpNeededForNext) * 100);
};
