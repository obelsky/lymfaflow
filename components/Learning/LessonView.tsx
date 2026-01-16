// ============================================
// LYMFAFLOW - Lesson View
// Detail lekce s pojmy
// ============================================

'use client';

import React from 'react';
import { BioloIcons } from '@/components/BioloIcons';
import { AIExplainCard, AIAskButton } from '@/components/AI';
import type { Lesson, Topic } from '@/types';
import type { User, TermExplanation } from './types';

interface LessonViewProps {
  lesson: Lesson;
  topic: Topic;
  user: User;
  termExplanation: TermExplanation | null;
  onBack: () => void;
  onComplete: () => void;
  onAskTerm: (term: string, definition: string) => void;
  onCloseTermExplanation: () => void;
}

export function LessonView({
  lesson,
  topic,
  user,
  termExplanation,
  onBack,
  onComplete,
  onAskTerm,
  onCloseTermExplanation,
}: LessonViewProps) {
  const isCompleted = user.completedLessons.includes(lesson.id);

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
            <h1 className="font-semibold text-[#2D3640] truncate">{lesson.title}</h1>
            <p className="text-xs text-[#6B7B8A]">{topic.title}</p>
          </div>
        </div>
      </header>

      <div className="px-5 lg:px-8 py-6 max-w-3xl mx-auto">
        {/* Proč je to důležité */}
        <div className="bg-[#F0F5F2] border border-[#A8C4B8]/30 rounded-2xl p-5 mb-4">
          <p className="text-xs font-semibold text-[#5C7D6D] uppercase tracking-wide mb-1">
            Proč to potřebuješ
          </p>
          <p className="text-[#2D3640]">{lesson.why}</p>
        </div>

        {/* Lidsky */}
        <div className="bg-[#FAF6ED] border border-[#C9A962]/30 rounded-2xl p-5 mb-6">
          <p className="text-xs font-semibold text-[#A68B4B] uppercase tracking-wide mb-1">
            Lidsky řečeno
          </p>
          <p className="text-[#2D3640]">{lesson.human_explanation}</p>
        </div>

        {/* Klíčové pojmy */}
        <h3 className="text-sm font-semibold text-[#6B7B8A] uppercase tracking-wide mb-3">
          Klíčové pojmy
        </h3>
        <div className="space-y-3 mb-6">
          {lesson.points.map((point, i) => (
            <div key={i} className="bg-white border border-[#E2E6EA] rounded-xl p-4 group">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-[#2D3640]">{point.term}</h4>
                  <AIAskButton onClick={() => onAskTerm(point.term, point.definition)} />
                </div>
                {point.latin && (
                  <span className="text-xs text-[#9BA8B4] italic bg-[#F7F4EF] px-2 py-0.5 rounded">
                    {point.latin}
                  </span>
                )}
              </div>
              <p className="text-sm text-[#6B7B8A] leading-relaxed">{point.definition}</p>
              
              {/* AI Explanation inline */}
              {termExplanation?.term === point.term && (
                <div className="mt-3">
                  <AIExplainCard
                    explanation={termExplanation.text}
                    professor="Da Vinci"
                    loading={termExplanation.loading}
                    onClose={onCloseTermExplanation}
                    compact
                  />
                </div>
              )}
              
              {point.tip && termExplanation?.term !== point.term && (
                <div className="mt-3 p-3 bg-[#FAF6ED] rounded-lg">
                  <p className="text-xs text-[#A68B4B]">{point.tip}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tip */}
        {lesson.tip && (
          <div className="bg-white border border-[#E2E6EA] rounded-xl p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FAF6ED] flex items-center justify-center flex-shrink-0">
                <span className="text-sm">💡</span>
              </div>
              <div>
                <h4 className="font-medium text-[#2D3640] mb-1">Tip</h4>
                <p className="text-sm text-[#6B7B8A]">{lesson.tip}</p>
              </div>
            </div>
          </div>
        )}

        {/* Praxe */}
        {lesson.practice && (
          <div className="bg-[#F0F5F2] border border-[#A8C4B8]/30 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#7A9E8E]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-sm">🎯</span>
              </div>
              <div>
                <h4 className="font-medium text-[#5C7D6D] mb-1">Vyzkoušej si</h4>
                <p className="text-sm text-[#2D3640]">{lesson.practice}</p>
              </div>
            </div>
          </div>
        )}

        {/* Complete button */}
        <button
          onClick={onComplete}
          disabled={isCompleted}
          className={`w-full py-4 rounded-xl font-semibold transition-all ${
            isCompleted
              ? 'bg-[#E2E6EA] text-[#9BA8B4] cursor-default'
              : 'bg-[#7A9E8E] hover:bg-[#5C7D6D] text-white shadow-sm hover:shadow-md'
          }`}
        >
          {isCompleted ? '✓ Hotovo' : 'Dokončit lekci (+20 XP)'}
        </button>
      </div>
    </div>
  );
}
