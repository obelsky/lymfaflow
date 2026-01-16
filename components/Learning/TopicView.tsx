// ============================================
// LYMFAFLOW - Topic View
// Přehled tématu s lekcemi
// ============================================

'use client';

import React from 'react';
import { BioloIcons, getTopicIcon } from '@/components/BioloIcons';
import type { Topic, Lesson } from '@/types';
import type { User } from './types';

interface TopicViewProps {
  topic: Topic;
  lessons: Lesson[];
  user: User;
  onBack: () => void;
  onSelectLesson: (lesson: Lesson) => void;
  onStartQuiz: () => void;
}

export function TopicView({
  topic,
  lessons,
  user,
  onBack,
  onSelectLesson,
  onStartQuiz,
}: TopicViewProps) {
  const TopicIcon = getTopicIcon(topic.icon);
  const completedInTopic = lessons.filter(l => user.completedLessons.includes(l.id)).length;
  const quizScore = user.quizResults[topic.id];
  const allLessonsCompleted = completedInTopic === lessons.length;

  return (
    <div className="animate-fade-in pb-24 lg:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-10 px-5 lg:px-8 py-4 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E2E6EA]">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-white border border-[#E2E6EA] flex items-center justify-center hover:bg-[#F7F4EF] transition-all"
          >
            <BioloIcons.arrowLeft className="w-5 h-5 text-[#6B7B8A]" />
          </button>
          <div className="flex-1">
            <h1 className="font-semibold text-[#2D3640]">{topic.title}</h1>
            <p className="text-xs text-[#6B7B8A]">{topic.subtitle}</p>
          </div>
        </div>
      </header>

      <div className="px-5 lg:px-8 py-6 max-w-3xl mx-auto">
        {/* Topic info card */}
        <div 
          className="rounded-2xl p-6 mb-6"
          style={{ backgroundColor: `${topic.color}10` }}
        >
          <div className="flex items-start gap-4">
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${topic.color}20` }}
            >
              <TopicIcon className="w-8 h-8" style={{ color: topic.color }} />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-[#2D3640] mb-1">{topic.title}</h2>
              <p className="text-sm text-[#6B7B8A] mb-3">{topic.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-[#6B7B8A]">
                  {completedInTopic}/{lessons.length} lekcí
                </span>
                {quizScore !== undefined && (
                  <span className={`font-medium ${quizScore >= 70 ? 'text-[#6B9E7A]' : 'text-[#C9A962]'}`}>
                    Test: {quizScore}%
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="h-2 bg-white/50 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all"
                style={{ 
                  width: `${(completedInTopic / lessons.length) * 100}%`,
                  backgroundColor: topic.color 
                }}
              />
            </div>
          </div>
        </div>

        {/* Lessons */}
        <h3 className="text-sm font-semibold text-[#6B7B8A] uppercase tracking-wide mb-3">
          Lekce ({lessons.length})
        </h3>
        <div className="space-y-3 mb-6">
          {lessons.map((lesson, index) => {
            const isCompleted = user.completedLessons.includes(lesson.id);
            const isLocked = index > 0 && !user.completedLessons.includes(lessons[index - 1].id);

            return (
              <button
                key={lesson.id}
                onClick={() => !isLocked && onSelectLesson(lesson)}
                disabled={isLocked}
                className={`w-full p-4 rounded-xl border text-left transition-all ${
                  isLocked 
                    ? 'bg-[#F7F4EF] border-[#E2E6EA] opacity-50 cursor-not-allowed'
                    : isCompleted
                      ? 'bg-[#EDF5EF] border-[#A8C4B8]/30 hover:shadow-sm'
                      : 'bg-white border-[#E2E6EA] hover:border-[#7A9E8E] hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isLocked 
                      ? 'bg-[#E2E6EA]'
                      : isCompleted 
                        ? 'bg-[#6B9E7A]' 
                        : 'bg-[#F7F4EF]'
                  }`}>
                    {isLocked ? (
                      <BioloIcons.lock className="w-5 h-5 text-[#9BA8B4]" />
                    ) : isCompleted ? (
                      <BioloIcons.checkCircle className="w-5 h-5 text-white" />
                    ) : (
                      <span className="font-medium text-[#6B7B8A]">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-[#2D3640]">{lesson.title}</h4>
                    <p className="text-xs text-[#6B7B8A]">
                      {lesson.points.length} pojmů • {lesson.estimated_minutes || 5} min
                    </p>
                  </div>
                  {!isLocked && (
                    <BioloIcons.chevronRight className="w-5 h-5 text-[#9BA8B4]" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Quiz button */}
        <button
          onClick={onStartQuiz}
          disabled={!allLessonsCompleted && completedInTopic === 0}
          className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
            allLessonsCompleted
              ? 'bg-[#7A9E8E] hover:bg-[#5C7D6D] text-white shadow-sm hover:shadow-md'
              : completedInTopic > 0
                ? 'bg-[#FAF6ED] text-[#A68B4B] border border-[#C9A962]/30'
                : 'bg-[#E2E6EA] text-[#9BA8B4] cursor-not-allowed'
          }`}
        >
          <BioloIcons.brain className="w-5 h-5" />
          <span>
            {allLessonsCompleted 
              ? 'Spustit test' 
              : completedInTopic > 0 
                ? 'Zkusit test (doporučeno dokončit lekce)'
                : 'Nejdřív dokonči alespoň 1 lekci'
            }
          </span>
        </button>
      </div>
    </div>
  );
}
