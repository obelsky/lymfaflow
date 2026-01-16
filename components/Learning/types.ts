// ============================================
// LYMFAFLOW - Learning Types & Constants
// ============================================

import type { QuizQuestion } from '@/types';
import { QUIZ_QUESTIONS } from '@/lib/data/questions';

// === TYPES ===

export interface User {
  name: string;
  xp: number;
  streak: number;
  completedLessons: string[];
  quizResults: Record<string, number>;
}

export interface QuizState {
  currentQuestion: number;
  answers: QuizAnswer[];
  showFeedback: boolean;
  showResult: boolean;
  score: number;
  reviewMode: boolean;
  reviewIndex: number;
}

export interface QuizAnswer {
  questionId: string;
  answer: number;
  correct: boolean;
}

export interface AIExplanation {
  text: string;
  professor: string;
  loading: boolean;
}

export interface TermExplanation {
  term: string;
  text: string;
  loading: boolean;
}

export type TabType = 'map' | 'knowledge' | 'train' | 'profile';
export type ViewType = 'home' | 'topic' | 'lesson' | 'quiz' | 'results' | 'daily' | 'knowledge';

// === CONSTANTS ===

export const LEVELS = [
  { level: 1, name: 'Nováček', icon: '🌟', minXP: 0, maxXP: 50 },
  { level: 2, name: 'Objevitel', icon: '🔍', minXP: 50, maxXP: 100 },
  { level: 3, name: 'Učeň', icon: '🌱', minXP: 100, maxXP: 200 },
  { level: 4, name: 'Student', icon: '📚', minXP: 200, maxXP: 350 },
  { level: 5, name: 'Praktikant', icon: '🔬', minXP: 350, maxXP: 500 },
  { level: 6, name: 'Pokročilý', icon: '⭐', minXP: 500, maxXP: 700 },
  { level: 7, name: 'Expert', icon: '🎓', minXP: 700, maxXP: 1000 },
  { level: 8, name: 'Mistr', icon: '👑', minXP: 1000, maxXP: Infinity },
] as const;

export const INITIAL_USER: User = {
  name: 'Student',
  xp: 125,
  streak: 3,
  completedLessons: [],
  quizResults: {},
};

export const INITIAL_QUIZ_STATE: QuizState = {
  currentQuestion: 0,
  answers: [],
  showFeedback: false,
  showResult: false,
  score: 0,
  reviewMode: false,
  reviewIndex: 0,
};

// === HELPERS ===

export const getRandomQuestions = (topicId: string, count: number = 5): QuizQuestion[] => {
  const questions = QUIZ_QUESTIONS[topicId] || [];
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const getDailyQuestions = (count: number = 5): QuizQuestion[] => {
  const allQuestions = Object.values(QUIZ_QUESTIONS).flat();
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const getCurrentLevel = (xp: number): number => {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) return i;
  }
  return 0;
};

export const getProgressToNextLevel = (xp: number, currentLevelIndex: number): number => {
  const nextLevel = LEVELS[currentLevelIndex + 1];
  if (!nextLevel) return 100;
  
  const currentMin = LEVELS[currentLevelIndex].minXP;
  const nextMin = nextLevel.minXP;
  return ((xp - currentMin) / (nextMin - currentMin)) * 100;
};
