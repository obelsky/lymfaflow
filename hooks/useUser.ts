// ============================================
// LYMFAFLOW - USE USER HOOK
// Správa uživatelského stavu
// ============================================

'use client';

import { useState, useCallback, useMemo } from 'react';
import { getLevelByXP, getNextLevel, getProgressToNextLevel } from '@/lib/data';
import type { UserProfile, Level } from '@/types';

interface UseUserReturn {
  user: UserProfile;
  currentLevel: Level;
  nextLevel: Level | null;
  progressToNextLevel: number;
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  saveQuizResult: (topicId: string, score: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  isLessonCompleted: (lessonId: string) => boolean;
  getQuizResult: (topicId: string) => number | undefined;
}

const DEFAULT_USER: UserProfile = {
  id: 'local-user',
  email: '',
  display_name: 'Student',
  xp: 0,
  streak: 0,
  level: 1,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

// Rozšíření pro lokální data (než bude Supabase)
interface LocalUserData extends UserProfile {
  completedLessons: string[];
  quizResults: Record<string, number>;
}

export function useUser(initialUser?: Partial<UserProfile>): UseUserReturn {
  const [userData, setUserData] = useState<LocalUserData>(() => ({
    ...DEFAULT_USER,
    ...initialUser,
    completedLessons: [],
    quizResults: {},
  }));

  const currentLevel = useMemo(() => getLevelByXP(userData.xp), [userData.xp]);
  const nextLevel = useMemo(() => getNextLevel(userData.xp), [userData.xp]);
  const progressToNextLevel = useMemo(() => getProgressToNextLevel(userData.xp), [userData.xp]);

  const addXP = useCallback((amount: number) => {
    setUserData(prev => ({
      ...prev,
      xp: prev.xp + amount,
      level: getLevelByXP(prev.xp + amount).level,
      updated_at: new Date().toISOString(),
    }));
  }, []);

  const completeLesson = useCallback((lessonId: string) => {
    setUserData(prev => {
      if (prev.completedLessons.includes(lessonId)) {
        return prev;
      }
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        xp: prev.xp + 20, // Default XP per lesson
        updated_at: new Date().toISOString(),
      };
    });
  }, []);

  const saveQuizResult = useCallback((topicId: string, score: number) => {
    setUserData(prev => ({
      ...prev,
      quizResults: {
        ...prev.quizResults,
        [topicId]: Math.max(prev.quizResults[topicId] || 0, score),
      },
      xp: prev.xp + Math.round(score / 2),
      updated_at: new Date().toISOString(),
    }));
  }, []);

  const incrementStreak = useCallback(() => {
    setUserData(prev => ({
      ...prev,
      streak: prev.streak + 1,
      updated_at: new Date().toISOString(),
    }));
  }, []);

  const resetStreak = useCallback(() => {
    setUserData(prev => ({
      ...prev,
      streak: 0,
      updated_at: new Date().toISOString(),
    }));
  }, []);

  const isLessonCompleted = useCallback((lessonId: string) => {
    return userData.completedLessons.includes(lessonId);
  }, [userData.completedLessons]);

  const getQuizResult = useCallback((topicId: string) => {
    return userData.quizResults[topicId];
  }, [userData.quizResults]);

  // Vrátit základní UserProfile (bez lokálních rozšíření)
  const user: UserProfile = {
    id: userData.id,
    email: userData.email,
    display_name: userData.display_name,
    avatar_url: userData.avatar_url,
    xp: userData.xp,
    streak: userData.streak,
    level: currentLevel.level,
    created_at: userData.created_at,
    updated_at: userData.updated_at,
  };

  return {
    user,
    currentLevel,
    nextLevel,
    progressToNextLevel,
    addXP,
    completeLesson,
    saveQuizResult,
    incrementStreak,
    resetStreak,
    isLessonCompleted,
    getQuizResult,
  };
}
