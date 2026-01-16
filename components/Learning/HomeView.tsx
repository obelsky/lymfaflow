// ============================================
// LYMFAFLOW - Home View (Body Map)
// Hlavní přehled témat
// ============================================

'use client';

import React from 'react';
import { BioloIcons, getTopicIcon } from '@/components/BioloIcons';
import { TOPICS } from '@/lib/data/topics';
import { LESSONS } from '@/lib/data/lessons';
import { QUIZ_QUESTIONS } from '@/lib/data/questions';
import type { Topic } from '@/types';
import type { User } from './types';

interface HomeViewProps {
  user: User;
  onSelectTopic: (topic: Topic) => void;
}

export function HomeView({ user, onSelectTopic }: HomeViewProps) {
  return (
    <div className="animate-fade-in pb-24 lg:pb-8">
      {/* Header */}
      <header className="px-5 lg:px-8 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <div>
              <h1 className="text-xl font-semibold text-[#2D3640]">Ahoj, {user.name}</h1>
              <p className="text-sm text-[#6B7B8A]">Pokračuj v průzkumu</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F0F5F2] rounded-full">
              <BioloIcons.sparkle className="w-4 h-4 text-[#7A9E8E]" />
              <span className="text-sm font-semibold text-[#5C7D6D]">{user.streak} dní</span>
            </div>
          </div>

          {/* Section title */}
          <h2 className="text-sm font-semibold text-[#6B7B8A] uppercase tracking-wide mb-4">
            Prozkoumej anatomii
          </h2>
        </div>
      </header>

      {/* Topics grid */}
      <div className="px-5 lg:px-8">
        <div className="max-w-3xl mx-auto grid gap-4">
          {TOPICS.map(topic => {
            const TopicIcon = getTopicIcon(topic.icon);
            const topicLessons = LESSONS[topic.id] || [];
            const completedLessons = topicLessons.filter(l => 
              user.completedLessons.includes(l.id)
            ).length;
            const quizScore = user.quizResults[topic.id];
            const progress = topicLessons.length > 0 
              ? (completedLessons / topicLessons.length) * 100 
              : 0;

            return (
              <button
                key={topic.id}
                onClick={() => onSelectTopic(topic)}
                className="w-full p-5 bg-white border border-[#E2E6EA] rounded-2xl hover:border-[#7A9E8E] hover:shadow-md transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${topic.color}15` }}
                  >
                    <TopicIcon className="w-6 h-6" style={{ color: topic.color }} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-[#2D3640]">{topic.title}</h3>
                      {quizScore !== undefined && (
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          quizScore >= 70 
                            ? 'bg-[#EDF5EF] text-[#6B9E7A]' 
                            : 'bg-[#FAF6ED] text-[#C9A962]'
                        }`}>
                          {quizScore}%
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#6B7B8A] mb-2">{topic.subtitle}</p>
                    
                    {/* Progress bar */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-[#E2E6EA] rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all"
                          style={{ width: `${progress}%`, backgroundColor: topic.color }}
                        />
                      </div>
                      <span className="text-xs text-[#9BA8B4]">
                        {completedLessons}/{topicLessons.length}
                      </span>
                    </div>
                  </div>
                  
                  <BioloIcons.chevronRight className="w-5 h-5 text-[#9BA8B4] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick stats */}
      <div className="px-5 lg:px-8 mt-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#F0F5F2] rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-[#5C7D6D] mb-3">Tvůj pokrok</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#2D3640]">{user.completedLessons.length}</p>
                <p className="text-xs text-[#6B7B8A]">Dokončených lekcí</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#2D3640]">{user.xp}</p>
                <p className="text-xs text-[#6B7B8A]">Celkem XP</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#2D3640]">
                  {Object.values(user.quizResults).filter(s => s >= 70).length}
                </p>
                <p className="text-xs text-[#6B7B8A]">Úspěšných testů</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
