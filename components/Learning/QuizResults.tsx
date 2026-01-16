// ============================================
// LYMFAFLOW - Quiz Results
// Výsledky kvízu + review
// ============================================

'use client';

import React from 'react';
import { BioloIcons } from '@/components/BioloIcons';
import type { QuizQuestion, Topic } from '@/types';
import type { QuizState } from './types';

interface QuizResultsProps {
  quizState: QuizState;
  questions: QuizQuestion[];
  topic?: Topic | null;
  isDaily?: boolean;
  onReview: () => void;
  onRetry: () => void;
  onBack: () => void;
}

export function QuizResults({
  quizState,
  questions,
  topic,
  isDaily = false,
  onReview,
  onRetry,
  onBack,
}: QuizResultsProps) {
  const passed = quizState.score >= 70;
  const wrongAnswers = quizState.answers.filter(a => !a.correct);

  return (
    <div className="animate-fade-in min-h-screen bg-[#FAF8F5] p-5 lg:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
            passed ? 'bg-[#EDF5EF]' : 'bg-[#FDF2F2]'
          }`}>
            {passed ? (
              <BioloIcons.trophy className="w-10 h-10 text-[#6B9E7A]" />
            ) : (
              <BioloIcons.clock className="w-10 h-10 text-[#C27B7B]" />
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-[#2D3640] mb-2">
            {passed ? '🎉 Skvělá práce!' : 'Ještě trénuj!'}
          </h2>
          
          <p className="text-[#6B7B8A]">
            {passed 
              ? `Máš to pod kontrolou. ${isDaily ? '' : `Pokračuj dalším tématem!`}`
              : `Nevadí, chyby jsou součást učení. Zkus si projít látku znovu.`
            }
          </p>
        </div>

        {/* Score */}
        <div className="bg-white border border-[#E2E6EA] rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#6B7B8A]">Skóre</span>
            <span className={`text-3xl font-bold ${passed ? 'text-[#6B9E7A]' : 'text-[#C27B7B]'}`}>
              {quizState.score}%
            </span>
          </div>
          
          <div className="h-3 bg-[#E2E6EA] rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                passed ? 'bg-[#6B9E7A]' : 'bg-[#C27B7B]'
              }`}
              style={{ width: `${quizState.score}%` }}
            />
          </div>
          
          <div className="flex justify-between mt-2 text-sm text-[#9BA8B4]">
            <span>{quizState.answers.filter(a => a.correct).length} správně</span>
            <span>{wrongAnswers.length} špatně</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white border border-[#E2E6EA] rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-[#2D3640]">{questions.length}</p>
            <p className="text-xs text-[#9BA8B4]">Otázek</p>
          </div>
          <div className="bg-[#EDF5EF] border border-[#6B9E7A]/30 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-[#6B9E7A]">
              {quizState.answers.filter(a => a.correct).length}
            </p>
            <p className="text-xs text-[#6B9E7A]">Správně</p>
          </div>
          <div className="bg-[#FDF2F2] border border-[#C27B7B]/30 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-[#C27B7B]">{wrongAnswers.length}</p>
            <p className="text-xs text-[#C27B7B]">Špatně</p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {wrongAnswers.length > 0 && (
            <button
              onClick={onReview}
              className="w-full py-4 bg-[#FAF6ED] hover:bg-[#F5EFE6] text-[#A68B4B] rounded-xl font-semibold transition-all border border-[#C9A962]/30"
            >
              📚 Projít chyby ({wrongAnswers.length})
            </button>
          )}
          
          <button
            onClick={onRetry}
            className="w-full py-4 bg-white hover:bg-[#F7F4EF] text-[#2D3640] rounded-xl font-semibold transition-all border border-[#E2E6EA]"
          >
            🔄 Zkusit znovu
          </button>
          
          <button
            onClick={onBack}
            className="w-full py-4 bg-[#7A9E8E] hover:bg-[#5C7D6D] text-white rounded-xl font-semibold transition-all"
          >
            {isDaily ? 'Zpět na mapu' : `Zpět na ${topic?.title || 'téma'}`}
          </button>
        </div>
      </div>
    </div>
  );
}

// === REVIEW MODE ===

interface QuizReviewProps {
  wrongAnswer: { questionId: string; answer: number; correct: boolean };
  question: QuizQuestion;
  reviewIndex: number;
  totalWrong: number;
  onNext: () => void;
  onFinish: () => void;
}

export function QuizReview({
  wrongAnswer,
  question,
  reviewIndex,
  totalWrong,
  onNext,
  onFinish,
}: QuizReviewProps) {
  const isLast = reviewIndex >= totalWrong - 1;

  return (
    <div className="animate-fade-in min-h-screen bg-[#FAF8F5] p-5 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF6ED] flex items-center justify-center">
              <BioloIcons.clock className="w-5 h-5 text-[#C9A962]" />
            </div>
            <div>
              <h2 className="font-semibold text-[#2D3640]">Opakování</h2>
              <p className="text-xs text-[#6B7B8A]">{reviewIndex + 1} z {totalWrong}</p>
            </div>
          </div>
          <button
            onClick={onFinish}
            className="text-sm text-[#6B7B8A] hover:text-[#2D3640]"
          >
            Ukončit
          </button>
        </div>

        {/* Question */}
        <div className="bg-white border border-[#E2E6EA] rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-[#2D3640] mb-4">
            {question.question}
          </h3>
          
          <div className="space-y-3">
            {question.options.map((option, i) => {
              const isWrongSelected = wrongAnswer.answer === i;
              const isCorrect = i === question.correct_index;
              
              return (
                <div
                  key={i}
                  className={`p-4 rounded-xl border-2 ${
                    isCorrect 
                      ? 'bg-[#EDF5EF] border-[#6B9E7A]' 
                      : isWrongSelected 
                        ? 'bg-[#FDF2F2] border-[#C27B7B]' 
                        : 'bg-white border-[#E2E6EA]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      isCorrect 
                        ? 'bg-[#6B9E7A] text-white' 
                        : isWrongSelected 
                          ? 'bg-[#C27B7B] text-white' 
                          : 'bg-[#F7F4EF] text-[#6B7B8A]'
                    }`}>
                      {isCorrect ? '✓' : isWrongSelected ? '✕' : String.fromCharCode(65 + i)}
                    </div>
                    <span className="text-[#2D3640]">{option}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        <div className="bg-[#FAF6ED] border border-[#C9A962]/30 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C9A962]/20 flex items-center justify-center flex-shrink-0">
              <BioloIcons.info className="w-4 h-4 text-[#C9A962]" />
            </div>
            <div>
              <h4 className="font-medium text-[#A68B4B] mb-1">Vysvětlení</h4>
              <p className="text-sm text-[#2D3640]">{question.explanation}</p>
            </div>
          </div>
        </div>

        {/* Action */}
        <button
          onClick={isLast ? onFinish : onNext}
          className="w-full py-4 bg-[#7A9E8E] hover:bg-[#5C7D6D] text-white rounded-xl font-semibold transition-all"
        >
          {isLast ? 'Dokončit opakování' : 'Další →'}
        </button>
      </div>
    </div>
  );
}
