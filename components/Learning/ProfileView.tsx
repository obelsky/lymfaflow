// ============================================
// LYMFAFLOW - Profile View
// Uživatelský profil a statistiky
// ============================================

'use client';

import React from 'react';
import { BioloIcons, getTopicIcon } from '@/components/BioloIcons';
import { TOPICS } from '@/lib/data/topics';
import { LEVELS, getCurrentLevel, getProgressToNextLevel, type User } from './types';

interface ProfileViewProps {
  user: User;
}

export function ProfileView({ user }: ProfileViewProps) {
  const currentLevel = getCurrentLevel(user.xp);
  const progressToNext = getProgressToNextLevel(user.xp, currentLevel);
  const nextLevel = LEVELS[currentLevel + 1];

  return (
    <div className="animate-fade-in pb-24 lg:pb-8">
      <div className="px-5 lg:px-8 py-6 max-w-3xl mx-auto">
        {/* Profile card */}
        <div className="bg-white border border-[#E2E6EA] rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-[#7A9E8E] flex items-center justify-center text-white text-2xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#2D3640]">{user.name}</h2>
              <p className="text-[#7A9E8E]">{LEVELS[currentLevel].name}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-[#F7F4EF] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[#2D3640]">{user.streak}</p>
              <p className="text-xs text-[#6B7B8A]">Streak</p>
            </div>
            <div className="bg-[#F7F4EF] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[#2D3640]">{user.xp}</p>
              <p className="text-xs text-[#6B7B8A]">XP</p>
            </div>
            <div className="bg-[#F7F4EF] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[#2D3640]">{user.completedLessons.length}</p>
              <p className="text-xs text-[#6B7B8A]">Lekcí</p>
            </div>
          </div>

          {/* XP Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#6B7B8A]">{LEVELS[currentLevel].name}</span>
              <span className="text-sm text-[#7A9E8E]">
                {nextLevel ? `${user.xp} / ${nextLevel.minXP} XP` : 'Max level!'}
              </span>
            </div>
            <div className="h-3 bg-[#E2E6EA] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#7A9E8E] rounded-full transition-all"
                style={{ width: `${progressToNext}%` }}
              />
            </div>
            {nextLevel && (
              <p className="text-xs text-[#9BA8B4] mt-1">
                {nextLevel.minXP - user.xp} XP do úrovně {nextLevel.name}
              </p>
            )}
          </div>
        </div>

        {/* Test results */}
        <h3 className="text-sm font-semibold text-[#6B7B8A] uppercase tracking-wide mb-3">
          Výsledky testů
        </h3>
        <div className="space-y-3">
          {TOPICS.map(topic => {
            const score = user.quizResults[topic.id];
            const TopicIcon = getTopicIcon(topic.icon);
            
            return (
              <div 
                key={topic.id} 
                className="bg-white border border-[#E2E6EA] rounded-xl p-4 flex items-center gap-4"
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${topic.color}15` }}
                >
                  <TopicIcon className="w-5 h-5" style={{ color: topic.color }} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#2D3640]">{topic.title}</p>
                </div>
                {score !== undefined ? (
                  <span className={`text-sm font-semibold ${
                    score >= 70 ? 'text-[#6B9E7A]' : 'text-[#C9A962]'
                  }`}>
                    {score}%
                  </span>
                ) : (
                  <span className="text-sm text-[#9BA8B4]">—</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Level badges */}
        <h3 className="text-sm font-semibold text-[#6B7B8A] uppercase tracking-wide mb-3 mt-6">
          Úrovně
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {LEVELS.map((level, i) => {
            const isUnlocked = i <= currentLevel;
            const isCurrent = i === currentLevel;
            
            return (
              <div 
                key={level.level}
                className={`p-3 rounded-xl text-center transition-all ${
                  isCurrent 
                    ? 'bg-[#7A9E8E] text-white' 
                    : isUnlocked 
                      ? 'bg-[#F0F5F2] text-[#5C7D6D]'
                      : 'bg-[#F7F4EF] text-[#9BA8B4] opacity-50'
                }`}
              >
                <span className="text-xl">{level.icon}</span>
                <p className="text-xs font-medium mt-1">{level.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
